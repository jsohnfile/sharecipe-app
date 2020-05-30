const Recipe = require('../models/recipe');
const Comment = require('../models/comment');

module.exports = {
    index,
    new: newRecipe,
    create: createRecipe
}

function createRecipe(req, res) {
    Recipe.create(req.body, function(err, recipe){
        recipe.user = req.user.id
        console.log("new recipe: ",recipe);
        console.log("req.body: ", req.body);
        res.redirect('/recipes')
    })
}

function newRecipe(req, res) {
    Recipe.find({}, function(err, recipes) {
        res.render('recipes/new', {recipes})
    })
}

function index(req, res) {
    Recipe.find({}, function(err, recipes) {
        res.render('recipes/index', {recipes})
    });
}

