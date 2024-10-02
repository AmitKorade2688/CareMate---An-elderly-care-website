import React, { useRef, useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Update with your server address

const VideoCall = () => {
    const [roomId, setRoomId] = useState('');
    const [isCaller, setIsCaller] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOff, setIsCameraOff] = useState(false);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerRef = useRef(null);
    const localStreamRef = useRef(null);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to signaling server');
        });

        socket.on('offer', handleOffer);
        socket.on('answer', handleAnswer);
        socket.on('candidate', handleCandidate);
        socket.on('newClient', handleNewClient);

        return () => {
            socket.off('offer', handleOffer);
            socket.off('answer', handleAnswer);
            socket.off('candidate', handleCandidate);
            socket.off('newClient', handleNewClient);
        };
    }, []);

    const createRoom = () => {
        const newRoomId = Math.random().toString(36).substring(2, 8);
        setRoomId(newRoomId);
        socket.emit('createRoom', newRoomId);
        setIsCaller(true);
        console.log(`Room created: ${newRoomId}`);
    };

    const joinRoom = () => {
        if (roomId) {
            console.log(`Joining room: ${roomId}`);
            socket.emit('joinRoom', roomId);
            setIsCaller(false);
        } else {
            console.log('Room ID is required to join.');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(roomId);
        alert('Room ID copied to clipboard! Share it with your friend.');
    };

    const startCall = async () => {
        localStreamRef.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideoRef.current.srcObject = localStreamRef.current;

        peerRef.current = new RTCPeerConnection();
        localStreamRef.current.getTracks().forEach(track => peerRef.current.addTrack(track, localStreamRef.current));

        peerRef.current.onicecandidate = event => {
            if (event.candidate) {
                socket.emit('candidate', event.candidate, roomId);
            }
        };

        peerRef.current.ontrack = event => {
            remoteVideoRef.current.srcObject = event.streams[0];
        };

        const offer = await peerRef.current.createOffer();
        await peerRef.current.setLocalDescription(offer);
        socket.emit('offer', offer, roomId);
    };

    const handleOffer = async (offer) => {
        console.log('Received offer');
        localStreamRef.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideoRef.current.srcObject = localStreamRef.current;

        peerRef.current = new RTCPeerConnection();
        localStreamRef.current.getTracks().forEach(track => peerRef.current.addTrack(track, localStreamRef.current));

        peerRef.current.onicecandidate = event => {
            if (event.candidate) {
                socket.emit('candidate', event.candidate, roomId);
            }
        };

        await peerRef.current.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerRef.current.createAnswer();
        await peerRef.current.setLocalDescription(answer);
        socket.emit('answer', answer, roomId);
    };

    const handleAnswer = (answer) => {
        console.log('Received answer');
        peerRef.current.setRemoteDescription(new RTCSessionDescription(answer));
    };

    const handleCandidate = (candidate) => {
        console.log('Received candidate');
        peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    };

    const handleNewClient = (clientId) => {
        console.log(`New client joined: ${clientId}`);
        if (!isCaller) {
            startCall(); // Only the new client should start the call
        }
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
        localStreamRef.current.getAudioTracks()[0].enabled = !isMuted;
    };

    const toggleCamera = () => {
        setIsCameraOff(!isCameraOff);
        localStreamRef.current.getVideoTracks()[0].enabled = !isCameraOff;
    };

    const leaveRoom = () => {
        if (peerRef.current) {
            peerRef.current.close();
            peerRef.current = null;
        }
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(track => track.stop());
            localStreamRef.current = null;
        }
        setRoomId('');
        setIsCaller(false);
        setIsMuted(false);
        setIsCameraOff(false);
        console.log('Left the room');
    };

    return (
        <div className="flex flex-col items-center mt-20"> {/* Increased mt value for more space */}
            <div className="flex">
                <video ref={localVideoRef} autoPlay muted className="border-2 border-gray-400 rounded-lg w-72" />
                <video ref={remoteVideoRef} autoPlay className="border-2 border-gray-400 rounded-lg w-72 ml-4" />
            </div>
            <div className="mt-4">
                <button onClick={createRoom} className="bg-blue-500 text-white py-2 px-4 rounded mr-2">Create Room</button>
                <input
                    type="text"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    placeholder="Enter room ID"
                    className="border-2 border-gray-400 rounded py-1 px-2 mr-2"
                />
                <button onClick={joinRoom} className="bg-green-500 text-white py-2 px-4 rounded">Join Room</button>
                {roomId && (
                    <button onClick={copyToClipboard} className="bg-yellow-500 text-white py-2 px-4 rounded ml-2">
                        Copy Room ID
                    </button>
                )}
            </div>
            <div className="mt-4">
                <button onClick={toggleMute} className={`py-2 px-4 rounded ${isMuted ? 'bg-red-500' : 'bg-yellow-500'} text-white mr-2`}>
                    {isMuted ? 'Unmute' : 'Mute'}
                </button>
                <button onClick={toggleCamera} className={`py-2 px-4 rounded ${isCameraOff ? 'bg-red-500' : 'bg-yellow-500'} text-white mr-2`}>
                    {isCameraOff ? 'Turn Camera Off' : 'Turn Camera On'}
                </button>
                <button onClick={leaveRoom} className="bg-gray-700 text-white py-2 px-4 rounded">Leave Room</button>
            </div>
        </div>
    );
};

export default VideoCall;
