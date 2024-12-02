const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({

    foodName: {type: String, required: true},
    amount: {type: Number, required: true},
    calories: {type: Number, required: true},
    protein: {type: Number, required: true},
    fat: {type: Number, required: true},
    carbs: {type: Number, required: true},
    category: {type: String, required: true},

});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
