const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: [{
        type: String,
    }],
    instructions: String,
    imgUrl: String,
    share: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    refLink: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Recipe', recipeSchema);