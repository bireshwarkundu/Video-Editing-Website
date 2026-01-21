import React, { useEffect, useRef } from 'react';
import useEditorStore from '../store/useEditorStore';

const VideoPlayer = () => {
    const { tracks, selectedClipId } = useEditorStore();
    const videoRef = useRef(null);

    // Derive selected clip
    let selectedClip = null;
    if (selectedClipId) {
        for (const track of tracks) {
            const found = track.clips.find(c => c._id === selectedClipId);
            if (found) {
                selectedClip = found;
                break;
            }
        }
    }

    // Apply effects
    useEffect(() => {
        if (videoRef.current && selectedClip) {
            const { brightness, contrast, volume } = selectedClip.effects;
            videoRef.current.style.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
            videoRef.current.volume = volume / 100;
        }
    }, [selectedClip]);

    if (!selectedClip) {
        return (
            <div className="h-full bg-black flex items-center justify-center text-gray-500 flex-col">
                <p>No clip selected</p>
                <p className="text-xs mt-2">Select a clip in the timeline to preview</p>
            </div>
        );
    }

    return (
        <div className="h-full bg-black flex items-center justify-center relative">
            <video
                ref={videoRef}
                src={selectedClip.src}
                controls
                autoPlay
                className="max-w-full max-h-full"
            />
        </div>
    );
};

export default VideoPlayer;
