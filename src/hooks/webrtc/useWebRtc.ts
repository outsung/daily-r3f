import Socket from "@/core/socket";
import { useCallback, useEffect, useRef, useState } from "react";
import useSocketEventOn from "../socket/useSocketEventOn";

const RTC_PEER_CONNECTION_CONFIG = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

interface RhetoricUser {
  socketId: string;
  email: string;
  receiveChannel: RTCDataChannel;
  position: [number, number, number];
}

export function useWebRtc(email = "테스트") {
  const [users, setUsers] = useState<RhetoricUser[]>([]);
  const peerRefs = useRef<{ [socketId: string]: RTCPeerConnection }>({});
  const sendChannelRefs = useRef<{ [socketId: string]: RTCDataChannel }>({});

  const send = (position: [number, number, number]) => {
    users.forEach((user) => {
      if (sendChannelRefs.current[user.socketId]) {
        console.log(
          "send",
          user,
          position,
          sendChannelRefs.current[user.socketId]
        );
        sendChannelRefs.current[user.socketId].send(JSON.stringify(position));
      }
    });
  };

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
          event.channel.onmessage = (e: any) => {
            console.log("onmessage !!!!!!!!!!!!! ");
            setUsers((prev) =>
              prev.map((p) =>
                p.socketId === socketID
                  ? { ...p, position: JSON.parse(e.data) }
                  : p
              )
            );
          };

          console.log("ondatachannel, event :", event);

          setUsers((prev) =>
            prev
              .filter((user) => user.socketId !== socketID)
              .concat({
                socketId: socketID,
                email,
                receiveChannel: event.channel,
                position: [0, 0, 0],
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

      users.forEach((user) => {
        if (sendChannelRefs.current[user.socketId]) {
          sendChannelRefs.current[user.socketId].close();
          delete sendChannelRefs.current[user.socketId];
        }
        if (peerRefs.current[user.socketId]) {
          peerRefs.current[user.socketId].close();
          delete peerRefs.current[user.socketId];
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
            offerSendEmail: email,
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
    setUsers((oldUsers) =>
      oldUsers.filter((user) => user.socketId !== data.id)
    );
  });

  return { send, users };
}
