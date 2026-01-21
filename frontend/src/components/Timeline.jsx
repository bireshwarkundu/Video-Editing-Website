import React from 'react';
import useEditorStore from '../store/useEditorStore';

const Timeline = () => {
    const { tracks, selectedClipId, setSelectedClip } = useEditorStore();

    return (
        <div className="h-full bg-gray-900 text-white flex flex-col border-t border-gray-700">
            <div className="h-8 bg-gray-800 border-b border-gray-700 flex items-center px-4 text-xs text-gray-400">
                00:00:00:00 (Time Ruler Placeholder)
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {tracks.map(track => (
                    <div key={track._id} className="flex h-24 mb-2">
                        {/* Track Header */}
                        <div className="w-24 flex-shrink-0 bg-gray-800 border-r border-gray-700 flex flex-col justify-center items-center rounded-l">
                            <span className="font-bold text-sm">{track.name}</span>
                            <span className="text-xs text-gray-500 uppercase">{track.type}</span>
                        </div>

                        {/* Track Lane */}
                        <div className="flex-1 bg-gray-800/50 relative rounded-r overflow-hidden border border-gray-700/50">
                            {track.clips.map(clip => (
                                <div
                                    key={clip._id}
                                    onClick={(e) => { e.stopPropagation(); setSelectedClip(clip._id); }}
                                    className={`absolute h-full top-0 cursor-pointer border-2 overflow-hidden flex items-center justify-center text-xs
                                        ${selectedClipId === clip._id ? 'border-yellow-400 z-10' : 'border-blue-500/50 hover:border-blue-400'}
                                    `}
                                    style={{
                                        left: `${clip.timelineStart * 20}px`, // Zoom scale
                                        width: `${(clip.outPoint - clip.inPoint) * 20}px`,
                                        backgroundColor: track.type === 'video' ? '#1E3A8A' : '#064E3B'
                                    }}
                                >
                                    <span className="text-white/80 select-none pointer-events-none truncate px-1">
                                        {clip._id.substring(0, 5)}...
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;
