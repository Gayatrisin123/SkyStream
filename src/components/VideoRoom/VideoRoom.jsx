import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { v4 as uuidv4 } from 'uuid';

const VideoRoom = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            const newRoomID = uuidv4();
            navigate(`/videoroom/${newRoomID}`);
        }
    }, [id, navigate]);

    if (!id) {
        return null;
    }

    const roomID = id;

    const myMeeting = async (element) => {
        const appID = Number(import.meta.env.VITE_APP_ID);
        const serverSecret = import.meta.env.VITE_SERVER_SECRET;
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomID,
            Date.now().toString(),
            "UjjwalS"
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);

        // Start the call
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Copy link',
                    url:
                        window.location.protocol + '//' +
                        window.location.host + `/videoroom/` + roomID,
                },
            ],
            turnOnMicrophoneWhenJoining: true,
            turnOnCameraWhenJoining: true,
            showMyCameraToggleButton: true,
            showMyMicrophoneToggleButton: true,
            showAudioVideoSettingsButton: true,
            showScreenSharingButton: true,
            showTextChat: true,
            showUserList: true,
            maxUsers: 50,
            layout: "Auto",
            showLayoutButton: true,
            scenario: {
                mode: "GroupCall",
                config: {
                    role: "Host",
                },
            },
        });
    };

    return (
        <div
            ref={(element) => {
                if (element) myMeeting(element);
            }}
            style={{ 
                width: '100vw', 
                height: '100vh', 
                backgroundColor: 'black', 
                overflow: 'hidden', 
                msOverflowY: 'auto', 
                msOverflowX: 'hidden', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                color: 'white', 
                position: 'relative',
                boxSizing: 'border-box',
                marginTop: '-4.6rem'
            }}
        >
        </div>
    );
};

export default VideoRoom;
