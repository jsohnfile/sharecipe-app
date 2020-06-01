const Recipe = require('../models/recipe');
const Comment = require('../models/comment');
const Ingredient = require('../models/ingredient');

module.exports = {
    index,
    new: newRecipe,
    create: createRecipe,
    edit,
    update,
    myAccount,
    show
}

function show(req, res) {
    console.log("req.params.id:", req.params.id)
    Recipe.findById(req.params.id, function(err, recipe){
        console.log("recipe to show: ", recipe)
        res.render('recipes/show', {recipe})
    })
}

function myAccount(req, res) {
    Recipe.find({user: req.user}, function(err, recipes) {
        console.log(recipes)
        res.render('recipes/myaccount', {recipes})
    });

}

function update(req, res) {
    req.body.share = !!req.body.share
    Recipe.findByIdAndUpdate(req.params.id, req.body, function(err, recipe){
        console.log("recipe: ", recipe)
        res.redirect(`/recipes`)
    })
}

function edit(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
        res.render('recipes/edit', {recipe})
     })
}

function createRecipe(req, res) {
    req.body.share = !!req.body.share
    req.body.user = req.user
    Recipe.create(req.body, function(err, recipe){
        console.log("req.body: ", req.body)
        res.redirect('/recipes')
    })
}

function newRecipe(req, res) {
    Recipe.find({}, function(err, recipes) {
        Ingredient.find({}, function(err, ingredients){
            Ingredient.findOne({}, function(err, ingredient){
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
    Recipe.find({share: true}, function(err, recipes) {
        console.log(recipes)
        res.render('recipes/index', {recipes})
    });
}

