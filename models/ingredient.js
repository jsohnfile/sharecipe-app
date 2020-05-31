const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    title: String,
    instructions: String,
    imgUrl: String,
    name: {
        type: String,
        required: true
    },
    recipes: [{
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Ingredient', ingredientSchema);