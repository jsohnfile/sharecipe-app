const Recipe = require('../models/recipe');
const Comment = require('../models/comment');
const Ingredient = require('../models/ingredient');

module.exports = {
    index,
    new: newRecipe,
    create: createRecipe,
    delete: deleteRecipe,
    edit,
    update,
    myAccount,
    show,
    search,
    updateIngredients,
    addIngredient
}

function search(req, res) {
    Recipe.find({ "ingredients": { "$regex": req.body.search, "$options": "i" } , share: true}, function(err, recipes){
        res.render('recipes/search', {title: 'Sharecipes', recipes})
    })
}

function show(req, res) {
    Recipe.findById(req.params.id)
    .populate('user')
    .exec(function(err, recipe){
        Comment.find({recipe: recipe._id}).populate('user')
        .exec(function(err, comments){
            res.render('recipes/show', {title: recipe.title, recipe, comments})
        })
    })
}

function index(req, res) {
    Recipe.find({share: true},function(err, recipes) {
            res.render('recipes/index', {title: "Sharecipes", recipes})
    });
}

