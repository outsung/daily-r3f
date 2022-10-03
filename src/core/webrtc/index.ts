export class WebRTC {
  localConnection: RTCPeerConnection = null; // RTCPeerConnection for our "local" connection
  remoteConnection: RTCPeerConnection = null; // RTCPeerConnection for the "remote"
  sendChannel: RTCDataChannel = null; // RTCDataChannel for the local (sender)
  receiveChannel: RTCDataChannel = null; // RTCDataChannel for the remote (receiver)

  // Connect the two peers. Normally you look for and connect to a remote
  // machine here, but we're just connecting two local objects, so we can
  // bypass that step.
  connectPeers() {
    console.log("connectPeers");
    // Create the local connection and its event listeners
    this.localConnection = new RTCPeerConnection();

    // Create the data channel and establish its event listeners
    this.sendChannel = this.localConnection.createDataChannel("sendChannel");
    this.sendChannel.onopen = this.handleSendChannelStatusChange;
    this.sendChannel.onclose = this.handleSendChannelStatusChange;
    console.log("this.sendChannel: ", this.sendChannel);

    // Create the remote connection and its event listeners

    this.remoteConnection = new RTCPeerConnection();
    this.remoteConnection.ondatachannel =
      this.receiveChannelCallback.bind(this);

    // Set up the ICE candidates for the two peers

    this.localConnection.onicecandidate = (e) =>
      !e.candidate ||
      this.remoteConnection
        .addIceCandidate(e.candidate)
        .catch(this.handleAddCandidateError);

    this.remoteConnection.onicecandidate = (e) =>
      !e.candidate ||
      this.localConnection
        .addIceCandidate(e.candidate)
        .catch(this.handleAddCandidateError);

    // Now create an offer to connect; this starts the process

    this.localConnection
      .createOffer()
      .then((offer) => this.localConnection.setLocalDescription(offer))
      .then(() =>
        this.remoteConnection.setRemoteDescription(
          this.localConnection.localDescription
        )
      )
      .then(() => this.remoteConnection.createAnswer())
      .then((answer) => this.remoteConnection.setLocalDescription(answer))
      .then(() =>
        this.localConnection.setRemoteDescription(
          this.remoteConnection.localDescription
        )
      )
      .catch(this.handleCreateDescriptionError);
  }

  // Handle errors attempting to create a description;
  // this can happen both when creating an offer and when
  // creating an answer. In this simple example, we handle
  // both the same way.
  handleCreateDescriptionError(error) {
    console.log("Unable to create an offer: " + error.toString());
  }

  // Handle successful addition of the ICE candidate
  // on the "local" end of the connection.
  handleLocalAddCandidateSuccess() {
    console.log("Success to local add candidate");
    // connectButton.disabled = true;
  }

  // Handle successful addition of the ICE candidate
  // on the "remote" end of the connection.
  handleRemoteAddCandidateSuccess() {
    console.log("Success to remote add candidate");
    // disconnectButton.disabled = false;
  }

  // Handle an error that occurs during addition of ICE candidate.
  handleAddCandidateError() {
    console.log("Oh noes! addICECandidate failed!");
  }

  // Handles clicks on the "Send" button by transmitting
  // a message to the remote peer.
  sendMessage(value: any) {
    console.log("sendMessage :", value);
    this.sendChannel.send(value);
  }

  // Handle status changes on the local end of the data
  // channel; this is the end doing the sending of data
  // in this example.
  handleSendChannelStatusChange(event) {
    console.log("handleSendChannelStatusChange", event);
    if (this.sendChannel) {
      const state = this.sendChannel.readyState;

      if (state === "open") {
        console.log("state is open");
        // messageInputBox.disabled = false;
        // messageInputBox.focus();
        // sendButton.disabled = false;
        // disconnectButton.disabled = false;
        // connectButton.disabled = true;
      } else {
        console.log("state is not open");
        // messageInputBox.disabled = true;
        // sendButton.disabled = true;
        // connectButton.disabled = false;
        // disconnectButton.disabled = true;
      }
    }
  }

  // Handle onmessage events for the receiving channel.
  // These are the data messages sent by the sending channel.
  handleReceiveMessage(event) {
    console.log("handleReceiveMessage : ", event.data);

    // var el = document.createElement("p");
    // var txtNode = document.createTextNode(event.data);

    // el.appendChild(txtNode);
    // receiveBox.appendChild(el);
  }

  // Handle status changes on the receiver's channel.

  handleReceiveChannelStatusChange(event) {
    if (this.receiveChannel) {
      console.log(
        "Receive channel's status has changed to " +
          this.receiveChannel.readyState
      );
    }

    // Here you would do stuff that needs to be done
    // when the channel's status changes.
  }

  // Called when the connection opens and the data
  // channel is ready to be connected to the remote.
  receiveChannelCallback(event) {
    console.log("receiveChannelCallback, ", event, this.handleReceiveMessage);
    this.receiveChannel = event.channel;
    this.receiveChannel.onmessage = this.handleReceiveMessage;
    this.receiveChannel.onopen = this.handleReceiveChannelStatusChange;
    this.receiveChannel.onclose = this.handleReceiveChannelStatusChange;

    console.log(this.receiveChannel);
  }

  // Close the connection, including data channels if they're open.
  // Also update the UI to reflect the disconnected status.
  disconnectPeers() {
    // Close the RTCDataChannels if they're open.

    this.sendChannel.close();
    this.receiveChannel.close();

    // Close the RTCPeerConnections

    this.localConnection.close();
    this.remoteConnection.close();

    this.sendChannel = null;
    this.receiveChannel = null;
    this.localConnection = null;
    this.remoteConnection = null;
  }
}
