const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient')
const User = require('../models/user')

module.exports = {
    index,
    edit,
    show,
    new: newRecipe,
    create: createRecipe,
    update,
    delete: deleteRecipe,
    updateIngredients,
    addIngredient,
    showFavorites
}

function showFavorites(req, res) {
    User.findById(req.user.id).populate('favorites').exec(function(err,user){
        res.render('myaccount/myfavorites', {title: 'My Favorites', user})
    });
}

function addIngredient(req, res) {
    Recipe.findById(req.params.id, function(err, recipe){
        recipe.ingredients.push(req.body.name);
        recipe.save(function(err){
            if(err) {
                console.log("Could not add Ingredient");
            }
            Recipe.findByIdAndUpdate(req.params.id, req.body, function(err, recipe){
                res.redirect(`/myaccount/${req.params.id}/edit`)
             });
        });
    });
}

function updateIngredients(req, res) {
    Recipe.findById(req.params.id, function(err, recipe){
        recipe.ingredients.splice(req.params.idx, 1);
        recipe.save(function(err){
            if(err) {
                console.log("Error");
            }
            Recipe.findByIdAndUpdate(req.params.id, req.body, function(err, recipe){
                res.redirect(`/myaccount/${req.params.id}/edit`)
            });
        });
    })
}

function deleteRecipe(req, res) {
    Recipe.findByIdAndRemove(req.params.id, function(err){
        res.redirect('/myaccount')
    });
}

function update(req, res) {
    req.body.share = !!req.body.share
    Recipe.findByIdAndUpdate(req.params.id, req.body, function(err, recipe){
        res.redirect('/myaccount')
    });
}

function index(req, res) {
    Recipe.find({user: req.user}, function(err, recipes) {
        res.render('myaccount', {title: 'My Sharecipes', recipes})
    });

}

function edit(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
        res.render('myaccount/edit', {title: 'Edit Recipe', recipe})
     });
}

function show(req, res) {
    Recipe.findById(req.params.id, function(err,recipe){
        res.render('myaccount/show', {title: 'Recipe Details', recipe})
    });
}

function createRecipe(req, res) {
    req.body.share = !!req.body.share
    req.body.user = req.user.id
    Ingredient.deleteMany({}, function(err){
    });
    Recipe.create(req.body, function(err, recipe){
        res.redirect('/myaccount')
    });
}

function newRecipe(req, res) {
        Ingredient.find({}, function(err, ingredients){
            Ingredient.findOne({}, function(err, ingredient){                  
                    res.render('myaccount/new', {title: 'Add a Sharecipe', ingredients, ingredient})
        });
            
    });
}