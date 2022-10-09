import Socket from "@/core/socket";
import { useCallback, useEffect, useRef } from "react";
import useSocketEventOn from "../socket/useSocketEventOn";
import { useOnMessage } from "./useOnMessage";
import { useSetSendWebRTC } from "./useSetSendWebRTC";

const RTC_PEER_CONNECTION_CONFIG = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

export function useWebRtc() {
  const peerRefs = useRef<{ [socketId: string]: RTCPeerConnection }>({});
  const sendChannelRefs = useRef<{ [socketId: string]: RTCDataChannel }>({});

  useSetSendWebRTC({
    send: (data) => {
      const socketIds = Object.keys(sendChannelRefs.current);

      socketIds.forEach((socketId) => {
        if (sendChannelRefs.current[socketId]) {
          sendChannelRefs.current[socketId].send(data);
        }
      });
    },
  });

  const onMessage = useOnMessage();

  const createPeerConnection = useCallback(
    (socketID: string, email: string) => {
      console.log("createPeerConnection", {
        socketID,
        email,
      });
      try {
        const pc = new RTCPeerConnection(RTC_PEER_CONNECTION_CONFIG);

        pc.onicecandidate = (e) => {
          if (!e.candidate) return;
          console.log("onicecandidate");
          Socket.emit("candidate", {
            candidate: e.candidate,
            candidateSendID: Socket.instance?.id,
            candidateReceiveID: socketID,
          });
        };

        pc.oniceconnectionstatechange = (e) => {
          console.log(e);
        };

        pc.ondatachannel = (event) => {
          // @ts-ignore
          event.channel.onmessage = (e: any) => onMessage(e.data);
          // (e: any) => {
          //   console.log("onmessage !!!!!!!!!!!!! ");
          //   setUsers((prev) =>
          //     prev.map((p) =>
          //       p.socketId === socketID
          //         ? { ...p, position: JSON.parse(e.data) }
          //         : p
          //     )
          //   );
          // };

          console.log("ondatachannel, event :", event);

          onMessage(
            JSON.stringify({
              eventName: "userEnter",
              payload: { name: email, userId: socketID },
            })
          );
        };

        return pc;
      } catch (e) {
        console.error(e);
        return undefined;
      }
    },
    []
  );

  useEffect(() => {
    return () => {
      Socket.instance?.disconnect();

      const socketIdsForRTCDataChannel = Object.keys(sendChannelRefs.current);
      socketIdsForRTCDataChannel.forEach((socketId) => {
        if (sendChannelRefs.current[socketId]) {
          sendChannelRefs.current[socketId].close();
          delete sendChannelRefs.current[socketId];
        }
      });

      const socketIdsForRTCPeerConnection = Object.keys(peerRefs.current);
      socketIdsForRTCPeerConnection.forEach((socketId) => {
        if (peerRefs.current[socketId]) {
          peerRefs.current[socketId].close();
          delete peerRefs.current[socketId];
        }
      });
    };
  }, [createPeerConnection]);

  // all_users
  useSocketEventOn(
    "allUsers",
    (allUsers: Array<{ id: string; email: string }>) => {
      console.log("allUsers get !");
      allUsers.forEach(async (user) => {
        // if (!localStreamRef.current) return;
        const pc = createPeerConnection(user.id, user.email);
        if (!pc) return;

        sendChannelRefs.current = {
          ...sendChannelRefs.current,
          [user.id]: pc.createDataChannel("sendChannel"),
        };
        peerRefs.current = { ...peerRefs.current, [user.id]: pc };

        try {
          const localSdp = await pc.createOffer();
          console.log("create offer success");
          await pc.setLocalDescription(new RTCSessionDescription(localSdp));

          Socket.emit("offer", {
            sdp: localSdp,
            offerSendID: Socket.instance?.id,
            offerSendEmail: "test",
            offerReceiveID: user.id,
          });
        } catch (e) {
          console.error(e);
        }
      });
    }
  );

  // getOffer
  useSocketEventOn(
    "getOffer",
    async (data: {
      sdp: RTCSessionDescription;
      offerSendID: string;
      offerSendEmail: string;
    }) => {
      const { sdp, offerSendID, offerSendEmail } = data;
      console.log("get offer");
      // if (!localStreamRef.current) return;
      const pc = createPeerConnection(offerSendID, offerSendEmail);
      if (!pc) return;

      sendChannelRefs.current = {
        ...sendChannelRefs.current,
        [offerSendID]: pc.createDataChannel("sendChannel"),
      };
      peerRefs.current = { ...peerRefs.current, [offerSendID]: pc };
      try {
        await pc.setRemoteDescription(new RTCSessionDescription(sdp));
        console.log("answer set remote description success");
        const localSdp = await pc.createAnswer();
        await pc.setLocalDescription(new RTCSessionDescription(localSdp));
        Socket.emit("answer", {
          sdp: localSdp,
          answerSendID: Socket.instance?.id,
          answerReceiveID: offerSendID,
        });
      } catch (e) {
        console.error(e);
      }
    }
  );

  // getAnswer
  useSocketEventOn(
    "getAnswer",
    (data: { sdp: RTCSessionDescription; answerSendID: string }) => {
      const { sdp, answerSendID } = data;
      console.log("get answer");
      const pc: RTCPeerConnection = peerRefs.current[answerSendID];
      if (!pc) return;
      pc.setRemoteDescription(new RTCSessionDescription(sdp));
    }
  );

  // getCandidate
  useSocketEventOn(
    "getCandidate",
    async (data: {
      candidate: RTCIceCandidateInit;
      candidateSendID: string;
    }) => {
      console.log("get candidate");
      const pc: RTCPeerConnection = peerRefs.current[data.candidateSendID];
      if (!pc) return;
      await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
      console.log("candidate add success");
    }
  );

  // user_exit
  useSocketEventOn("userExit", (data: { id: string }) => {
    if (sendChannelRefs.current[data.id]) {
      sendChannelRefs.current[data.id].close();
      delete sendChannelRefs.current[data.id];
    }
    if (peerRefs.current[data.id]) {
      peerRefs.current[data.id].close();
      delete peerRefs.current[data.id];
    }

    onMessage(
      JSON.stringify({
        eventName: "userLeave",
        payload: { userId: data.id, name: "unknown" },
      })
    );
  });
}
