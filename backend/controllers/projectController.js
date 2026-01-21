const Project = require('../models/Project');

// @desc    Create a new project
// @route   POST /api/projects
// @access  Public
const createProject = async (req, res) => {
    try {
        const project = new Project({
            name: req.body.name || 'Untitled Project',
            tracks: [
                {
                    name: 'V1',
                    type: 'video',
                    clips: []
                },
                {
                    name: 'A1',
                    type: 'audio',
                    clips: []
                }
            ]
        });

        const createdProject = await project.save();
        res.status(201).json(createdProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get project by ID
// @route   GET /api/projects/:id
// @access  Public
const getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update project (Auto-Save)
// @route   PUT /api/projects/:id
// @access  Public
const updateProject = async (req, res) => {
    try {
        const { name, tracks } = req.body;

        const project = await Project.findById(req.params.id);

        if (project) {
            project.name = name || project.name;
            project.tracks = tracks || project.tracks;

            const updatedProject = await project.save();
            res.json(updatedProject);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createProject,
    getProject,
    updateProject
};
