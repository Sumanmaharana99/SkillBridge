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
  <div className="min-h-screen bg-gray-900 text-white flex flex-col">

    {/* Header */}
    <div className="flex justify-between items-center p-4 border-b border-gray-700">
      <h1 className="text-2xl font-bold">
        SkillBridge Video Call
      </h1>

      <div className="bg-green-600 px-3 py-1 rounded-full text-sm">
        Room: {roomId}
      </div>
    </div>

    {/* Videos */}
    <div className="flex-1 flex items-center justify-center gap-6 p-6">

      {/* Remote Video */}
      <div className="relative">
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-[700px] h-[450px] rounded-xl bg-black border border-gray-700 shadow-lg object-cover"
        />

        <span className="absolute bottom-3 left-3 bg-black/70 px-3 py-1 rounded">
          Participant
        </span>
      </div>

      {/* Local Video */}
      <div className="relative">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="w-[250px] h-[180px] rounded-xl bg-black border border-gray-700 shadow-lg object-cover"
        />

        <span className="absolute bottom-3 left-3 bg-black/70 px-3 py-1 rounded">
          You
        </span>
      </div>

    </div>

    {/* Controls */}
    <div className="flex justify-center gap-4 p-6 border-t border-gray-700">

      <button
        onClick={toggleMic}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
      >
        🎤 Mic
      </button>

      <button
        onClick={toggleCamera}
        className="bg-yellow-600 hover:bg-yellow-700 px-6 py-3 rounded-lg font-semibold"
      >
        📷 Camera
      </button>

      <button
        onClick={leaveCall}
        className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold"
      >
        📞 Leave
      </button>

    </div>

  </div>
);
}

export default VideoRoom;