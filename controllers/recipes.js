const Recipe = require('../models/recipe');
const Comment = require('../models/comment');
const Ingredient = require('../models/ingredient');

module.exports = {
    index,
    new: newRecipe,
    create: createRecipe,
    edit,
    update
}

function update(req, res) {
    Recipe.findByIdAndUpdate(req.params.id, req.body, function(err, recipe){
        res.redirect(`/recipes`)
    })
}

function edit(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
        res.render('recipes/edit', {recipe})
     })
}

function createRecipe(req, res) {
    Recipe.create(req.body, function(err, recipe){
        recipe.user = req.user.id
        res.redirect('/recipes')
    })
}

function newRecipe(req, res) {
    Recipe.find({}, function(err, recipes) {
        Ingredient.find({}, function(err, ingredients){
            Ingredient.findOne({}, function(err,ingredient){
                // Ingredient.findOne(ingredient => ingredient.createAt< Date.now())
                //     console.log(ingredients);
                //     let ingredient =ingredients[0]
                //     console.log("ingredient: ",ingredient);
                    
                    res.render('recipes/new', {recipes, ingredients, ingredient})

            })
        });
            
    });
}

function index(req, res) {
    Recipe.find({}, function(err, recipes) {
        console.log(recipes)
        res.render('recipes/index', {recipes})
    });
}

