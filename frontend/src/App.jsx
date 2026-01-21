import { useEffect, useState } from 'react';
import axios from 'axios';
import useEditorStore from './store/useEditorStore';
import MediaLibrary from './components/MediaLibrary';
import Timeline from './components/Timeline';
import Inspector from './components/Inspector';
import VideoPlayer from './components/VideoPlayer';

const API_URL = 'http://localhost:5001/api/projects';

function App() {
  const {
    projectId,
    projectName,
    tracks,
    loadProject,
  } = useEditorStore();

  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const createNewProject = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(API_URL, { name: 'My Awesome Video' });
      loadProject(res.data);
      showNotification('Project Created!');
    } catch (error) {
      console.error('Error creating project:', error);
      showNotification('Error creating project');
    } finally {
      setIsLoading(false);
    }
  };

  const saveProject = async () => {
    if (!projectId) return;
    try {
      const res = await axios.put(`${API_URL}/${projectId}`, {
        name: projectName,
        tracks: tracks
      });
      showNotification('Project Saved!');
    } catch (error) {
      console.error('Error saving project:', error);
      showNotification('Error saving project');
    }
  };

  if (!projectId) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Pro Web Video Editor</h1>
          <button
            onClick={createNewProject}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-bold text-lg disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : 'Create New Project'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans overflow-hidden">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-blue-600 px-4 py-2 rounded shadow-lg z-50 animate-bounce">
          {notification}
        </div>
      )}

      {/* Header */}
      <header className="h-12 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4 flex-shrink-0">
        <div className="font-bold text-lg">Pro Web Video Editor <span className="text-xs font-normal text-gray-400 ml-2"> - {projectName}</span></div>
        <div className="flex gap-2">
          <button onClick={saveProject} className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded text-sm font-semibold">
            Save
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Media Library */}
        <div className="w-64 flex-shrink-0">
          <MediaLibrary />
        </div>

        {/* Center: Player */}
        <div className="flex-1 border-r border-gray-700">
          <VideoPlayer />
        </div>

        {/* Right: Inspector */}
        <div className="w-72 flex-shrink-0">
          <Inspector />
        </div>
      </div>

      {/* Bottom: Timeline */}
      <div className="h-80 flex-shrink-0">
        <Timeline />
      </div>
    </div>
  );
}

export default App;
