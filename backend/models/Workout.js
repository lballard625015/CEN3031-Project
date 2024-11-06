const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    sets: {type: Number, required: true},
    reps: {type: String, required: true}
})

const workoutSchema = new mongoose.Schema({
    name: {type: String, required: true},
    workout: {type: [exerciseSchema], required: true}
})

const Exercise = mongoose.model('Exercise', exerciseSchema);
const Workout = mongoose.model('Workout', workoutSchema);

module.exports = {Exercise, Workout};
