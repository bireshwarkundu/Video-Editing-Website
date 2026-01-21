import React from 'react';
import useEditorStore from '../store/useEditorStore';

const MediaLibrary = () => {
    const { assets, addAsset, tracks, addClip } = useEditorStore();
    const fileInputRef = React.useRef(null);

    const handleImportClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const url = URL.createObjectURL(file);

        // In a real app we'd load the video in a hidden element to get duration
        // For now, we default to 10s
        addAsset({
            id: Date.now().toString(),
            name: file.name,
            type: 'video',
            duration: 10,
            src: url
        });

        // Reset input
        event.target.value = '';
    };

    const handleAddToTimeline = (asset) => {
        // Find first video track
        const videoTrack = tracks.find(t => t.type === 'video');
        if (videoTrack) {
            addClip(videoTrack._id, {
                inPoint: 0,
                outPoint: asset.duration,
                timelineStart: 0,
                type: asset.type,
                src: asset.src,
                effects: { brightness: 100, contrast: 100, volume: 100 }
            });
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-800 text-white border-r border-gray-700">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h2 className="font-bold">Media Library</h2>
                <input
                    type="file"
                    accept="video/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />
                <button
                    onClick={handleImportClick}
                    className="bg-blue-600 hover:bg-blue-500 text-xs px-2 py-1 rounded"
                >
                    + Import
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {assets.length === 0 && <p className="text-gray-500 text-sm text-center mt-10">No media import yet</p>}
                {assets.map(asset => (
                    <div key={asset.id} className="bg-gray-700 p-2 rounded flex justify-between items-center group">
                        <div className="truncate text-sm flex-1" title={asset.name}>{asset.name}</div>
                        <button
                            onClick={() => handleAddToTimeline(asset)}
                            className="bg-green-600 hover:bg-green-500 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            Add
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MediaLibrary;
