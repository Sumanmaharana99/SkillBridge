import {
  useEffect,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import socket from "../socket";

function VideoRoom() {
  const { roomId } = useParams();
  const localVideoRef = useRef(null);
  const peerRef = useRef(null);
  const streamRef = useRef(null);
  const remoteVideoRef = useRef(null);
const navigate = useNavigate();
  const toggleMic = () => {
  const audioTrack =
    streamRef.current
      ?.getAudioTracks()[0];

  if (audioTrack) {
    audioTrack.enabled =
      !audioTrack.enabled;
  }
};
const toggleCamera = () => {
  const videoTrack =
    streamRef.current
      ?.getVideoTracks()[0];

  if (videoTrack) {
    videoTrack.enabled =
      !videoTrack.enabled;
  }
};
const leaveCall = () => {
  streamRef.current
    ?.getTracks()
    .forEach(track => track.stop());

  peerRef.current?.close();

  navigate("/dashboard");
};

  useEffect(() => {
    //socket.emit("join-room",roomId);

    peerRef.current =
      new RTCPeerConnection({
        iceServers: [
          {
            urls:
              "stun:stun.l.google.com:19302",
          },
        ],
      });

peerRef.current.ontrack = (
  event
) => {
  console.log(
    "Remote Stream Received"
  );

  console.log(
    event.streams[0].getVideoTracks()
  );

  if (
  remoteVideoRef.current &&
  remoteVideoRef.current.srcObject !==
    event.streams[0]
) {
  remoteVideoRef.current.srcObject =
    event.streams[0];
}
};
    //ICE sender  
peerRef.current.onicecandidate = (
  event
) => {
  if (event.candidate) {
    socket.emit("ice-candidate", {
      roomId,
      candidate:
        event.candidate,
    });

    console.log(
      "ICE Candidate Sent"
    );
  }
};
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        console.log(
          "Media stream obtained"
        );

        streamRef.current =stream;

        localVideoRef.current.srcObject =stream;

        stream
          .getTracks()
          .forEach((track) => {
            peerRef.current.addTrack(
              track,
              stream
            );
          });
            socket.emit("join-room", roomId);
      })
      .catch((err) => {
        console.error(err);
      });

    socket.on(
      "user-joined",
      async (userId) => {
        console.log(
          "User Joined:",
          userId
        );

        const offer =
          await peerRef.current.createOffer();

        await peerRef.current.setLocalDescription(
          offer
        );

        socket.emit("offer", {
          roomId,
          offer,
        });

        console.log(
          "Offer Sent"
        );
      }
    );

    socket.on(
      "offer",
      async (offer) => {
        console.log(
          "Offer Received"
        );

        await peerRef.current.setRemoteDescription(
          offer
        );

        const answer =
          await peerRef.current.createAnswer();

        await peerRef.current.setLocalDescription(
          answer
        );

        socket.emit("answer", {
          roomId,
          answer,
        });

        console.log(
          "Answer Sent"
        );
      }
    );

    socket.on(
      "answer",
      async (answer) => {
        console.log(
          "Answer Received"
        );

        await peerRef.current.setRemoteDescription(
          answer
        );
      }
    );

socket.on(
  "ice-candidate",
  async (candidate) => {
    console.log(
      "ICE Candidate Received"
    );

    try {
      await peerRef.current.addIceCandidate(
        candidate
      );
    } catch (err) {
      console.error(err);
    }
  }
);

return () => {
  socket.off("user-joined");
  socket.off("offer");
  socket.off("answer");
  socket.off("ice-candidate");

  streamRef.current
    ?.getTracks()
    .forEach(track => track.stop());

  peerRef.current?.close();
};
  }, [roomId]);

  return (
    <div>
      <h1>Video Room</h1>

      <p>Room ID: {roomId}</p>

      <video
        ref={localVideoRef}
        autoPlay
        muted
        playsInline
        style={{
          width: "400px",
        }}
      />
    <video
  ref={remoteVideoRef}
  autoPlay
  playsInline
  width="400"
  height="300"
  style={{
    border: "2px solid red",
    background: "black",
  }}
/>
<button onClick={toggleMic}>
  Toggle Mic
</button>

<button onClick={toggleCamera}>
  Toggle Camera
</button>
<button onClick={leaveCall}>
  Leave Call
</button>
    </div>
  );
}

export default VideoRoom;