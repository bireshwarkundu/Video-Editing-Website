const mongoose = require('mongoose');

const clipSchema = new mongoose.Schema({
    _id: { type: String },
    inPoint: {
        type: Number,
        default: 0
    },
    outPoint: {
        type: Number,
        required: true
    },
    timelineStart: {
        type: Number,
        required: true
    },
    effects: {
        brightness: { type: Number, default: 100 },
        contrast: { type: Number, default: 100 },
        volume: { type: Number, default: 100 }
    },
    src: {
        type: String, // URL or file path to media
        required: false
    },
    type: {
        type: String,
        enum: ['video', 'audio'],
        default: 'video'
    }
});

const trackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['video', 'audio'],
        required: true
    },
    clips: [clipSchema]
});

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'Untitled Project'
    },
    tracks: [trackSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
