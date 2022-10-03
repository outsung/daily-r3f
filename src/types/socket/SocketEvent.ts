export type SocketEvent = {
  test: { data: string };

  getRooms: Record<string, { id: string; email: string }[]>;
  userExit: { id: string };
  getCandidate: {
    candidate: RTCIceCandidateInit;
    candidateSendID: string;
  };
  getAnswer: { sdp: RTCSessionDescription; answerSendID: string };
  getOffer: {
    sdp: RTCSessionDescription;
    offerSendID: string;
    offerSendEmail: string;
  };
  allUsers: Array<{ id: string; email: string }>;
};
