const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient')

module.exports ={
    create: createIngredient
}

function createIngredient(req, res) {
    Ingredient.create(req.body, function(err, ingredient){
        console.log("req.body:", req.body);
        console.log("ingredient: ",ingredient);
        res.render("recipes/new", {ingredient});
    });
}