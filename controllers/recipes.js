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
    show,
    search
}

function search(req, res) {
    Recipe.find({ "ingredients": { "$regex": req.body.search, "$options": "i" } }, function(err, recipes){
        console.log(err)
        console.log("recipes: ", recipes)
        res.render('recipes/search', {title: 'Sharecipes', recipes})
    })
}

function show(req, res) {
    Recipe.findById(req.params.id)
    .populate('user')
    .exec(function(err, recipe){
        Comment.find({recipe: recipe._id}).populate('user')
        .exec(function(err, comments){
            console.log("recipe to show: ", recipe)
            res.render('recipes/show', {title: recipe.title, recipe, comments})
        })
    })
}

function myAccount(req, res) {
    Recipe.find({user: req.user}, function(err, recipes) {
        console.log(recipes)
        res.render('recipes/myaccount', {title: 'My Account', recipes})
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
        console.log("req.body: ", req.body)
        console.log("new recipe ", recipe)
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
            console.log(recipes)
            res.render('recipes/index', {title: "Sharecipes", recipes})
    });
}

