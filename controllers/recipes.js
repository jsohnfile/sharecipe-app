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

function addIngredient(req, res) {
    Recipe.findById(req.params.id, function(err, recipe){
        recipe.ingredients.push(req.body.name);
        recipe.save(function(err){
            if(err) {
                console.log("Could not add Ingredient");
            }
            Recipe.findByIdAndUpdate(req.params.id, req.body, function(err, recipe){
                res.redirect(`/recipes/${req.params.id}/edit`)
             });
        });
    });
}

function deleteRecipe(req, res) {
    Recipe.findByIdAndRemove(req.params.id, function(err){
        res.redirect('/recipes/myaccount')
    })
}

function updateIngredients(req, res) {
    Recipe.findById(req.params.id, function(err, recipe){
        console.log(req.params.idx, "<---req.params.idx")
        recipe.ingredients.splice(req.params.idx, 1);
        recipe.save(function(err){
            if(err) {
                console.log("Error");
            }
            Recipe.findByIdAndUpdate(req.params.id, req.body, function(err, recipe){
            res.redirect(`/recipes/${req.params.id}/edit`)
         })
        })
    })
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

function myAccount(req, res) {
    Recipe.find({user: req.user}, function(err, recipes) {
        res.render('recipes/myaccount', {title: 'My Account', recipes})
    });

}

function update(req, res) {
    req.body.share = !!req.body.share
    Recipe.findByIdAndUpdate(req.params.id, req.body, function(err, recipe){
        res.redirect('/recipes/myaccount')
    })
}

function edit(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
        res.render('recipes/edit', {title: recipe.title, recipe})
     })
}

function createRecipe(req, res) {
    console.log("req.body: ", req.body)
    req.body.share = !!req.body.share
    req.body.user = req.user.id
    Ingredient.deleteMany({}, function(err){
    })
    Recipe.create(req.body, function(err, recipe){
        res.redirect('/recipes/myaccount')
    })
}

function newRecipe(req, res) {
        Ingredient.find({}, function(err, ingredients){
            Ingredient.findOne({}, function(err, ingredient){                  
                    res.render('recipes/new', {title: 'Add a Sharecipe', ingredients, ingredient})
        });
            
    });
}

function index(req, res) {
    Recipe.find({share: true},function(err, recipes) {
            res.render('recipes/index', {title: "Sharecipes", recipes})
    });
}

