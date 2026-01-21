import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useEditorStore = create(devtools((set) => ({
    projectId: null,
    projectName: 'Untitled Project',
    tracks: [], // Array of { id, name, type, clips: [] }
    assets: [],
    selectedClipId: null,
    playbackTime: 0, // In seconds

    // Hydrate store from backend data
    loadProject: (projectData) => set({
        projectId: projectData._id,
        projectName: projectData.name,
        tracks: projectData.tracks,
        selectedClipId: null
    }, false, 'loadProject'),

    setPlaybackTime: (time) => set({ playbackTime: time }, false, 'setPlaybackTime'),

    setSelectedClip: (clipId) => set({ selectedClipId: clipId }, false, 'setSelectedClip'),

    addAsset: (asset) => set((state) => ({ assets: [...state.assets, asset] }), false, 'addAsset'),

    addClip: (trackId, clipData) => set((state) => {
        const newTracks = state.tracks.map((track) => {
            if (track._id === trackId) {
                return {
                    ...track,
                    clips: [...track.clips, { ...clipData, _id: clipData._id || Date.now().toString() }]
                };
            }
            return track;
        });
        return { tracks: newTracks };
    }, false, 'addClip'),

    updateClip: (trackId, clipId, updates) => set((state) => {
        const newTracks = state.tracks.map((track) => {
            if (track._id === trackId) {
                const newClips = track.clips.map((clip) => {
                    if (clip._id === clipId) {
                        // merge updates (including nested effects)
                        const updatedClip = { ...clip, ...updates };
                        if (updates.effects) {
                            updatedClip.effects = { ...clip.effects, ...updates.effects };
                        }
                        return updatedClip;
                    }
                    return clip;
                });
                return { ...track, clips: newClips };
            }
            return track;
        });
        return { tracks: newTracks };
    }, false, 'updateClip')

})));

export default useEditorStore;
