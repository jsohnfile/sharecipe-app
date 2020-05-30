const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: String,
    instructions: String,
    imgUrl: String,
    comments: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Recipe', recipeSchema);