const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient')

module.exports ={
    create: createIngredient,
    delete: deleteIngredient
}

function deleteIngredient(req, res) {
    console.log("req.params.id: ", req.params.id)
    Ingredient.findByIdAndDelete(req.params.id, function(err){
        Ingredient.create(req.body, function(err, ingredient){
            Ingredient.find({}, function(err, ingredients){
                res.render("recipes/new", {title: 'Add A Recipe', ingredient, ingredients});
            });
        })
    });
}

function createIngredient(req, res) {
    req.body.share = !!req.body.share
    Ingredient.create(req.body, function(err, ingredient){
        Ingredient.find({}, function(err, ingredients){
            console.log("req.body:", req.body);
            console.log("ingredient: ",ingredient);
            res.render("recipes/new", {title: 'Add A Recipe', ingredient, ingredients});
        });
    });
}