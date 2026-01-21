import React from 'react';
import useEditorStore from '../store/useEditorStore';

const Inspector = () => {
    const { selectedClipId, tracks, updateClip } = useEditorStore();

    // Find selected clip data
    let selectedClip = null;
    let trackId = null;

    if (selectedClipId) {
        for (const track of tracks) {
            const found = track.clips.find(c => c._id === selectedClipId);
            if (found) {
                selectedClip = found;
                trackId = track._id;
                break;
            }
        }
    }

    const handleChange = (effect, value) => {
        if (!selectedClip || !trackId) return;
        updateClip(trackId, selectedClip._id, {
            effects: {
                ...selectedClip.effects,
                [effect]: parseFloat(value)
            }
        });
    };

    if (!selectedClip) {
        return (
            <div className="h-full bg-gray-800 border-l border-gray-700 p-4 text-gray-500 text-center text-sm">
                Select a clip to edit properties
            </div>
        );
    }

    return (
        <div className="h-full bg-gray-800 border-l border-gray-700 p-4 text-white overflow-y-auto">
            <h2 className="font-bold mb-4 border-b border-gray-700 pb-2">Inspector</h2>

            <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">Color Grading</h3>
                <div className="space-y-4">
                    <div>
                        <label className="flex justify-between text-sm mb-1">
                            Brightness <span>{selectedClip.effects.brightness}%</span>
                        </label>
                        <input
                            type="range" min="0" max="200"
                            value={selectedClip.effects.brightness}
                            onChange={(e) => handleChange('brightness', e.target.value)}
                            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                    <div>
                        <label className="flex justify-between text-sm mb-1">
                            Contrast <span>{selectedClip.effects.contrast}%</span>
                        </label>
                        <input
                            type="range" min="0" max="200"
                            value={selectedClip.effects.contrast}
                            onChange={(e) => handleChange('contrast', e.target.value)}
                            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">Audio</h3>
                <div>
                    <label className="flex justify-between text-sm mb-1">
                        Volume <span>{selectedClip.effects.volume}%</span>
                    </label>
                    <input
                        type="range" min="0" max="200"
                        value={selectedClip.effects.volume}
                        onChange={(e) => handleChange('volume', e.target.value)}
                        className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
};

export default Inspector;
