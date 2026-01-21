const express = require('express');
const router = express.Router();
const {
    createProject,
    getProject,
    updateProject
} = require('../controllers/projectController');

router.route('/').post(createProject);
router.route('/:id').get(getProject).put(updateProject);

module.exports = router;
