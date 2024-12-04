const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    age: {type: Number, required: true},
    height: {type: Number, required: true},
    goal: {type: String, required: true},
    workouts: [
        {
            name: { type: String, required: true },
            workout: [
                {
                    name: { type: String, required: true },
                    sets: { type: Number, required: true },
                    reps: { type: Number, required: true }
                }
            ]
        }
    ],
    completedWorkouts: {
        type: Map,
        of: [String], // Days of the week mapping to a list of completed workout names
        default: {
            Sunday: [],
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: []
        }
    },
    streak: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);

module.exports = User;