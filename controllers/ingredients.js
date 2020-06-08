const Ingredient = require('../models/ingredient')

module.exports ={
    create: createIngredient,
    delete: deleteIngredient
}

function deleteIngredient(req, res) {
    console.log('req.query', req.body)
    Ingredient.create(req.body, function(err, ingredient){
        Ingredient.findByIdAndDelete(req.params.id, function(err){
            Ingredient.find({}, function(err, ingredients){
                console.log('ingredients', ingredients)
                let ingredient=ingredients[ingredients.length-1]
                console.log('ingredient', ingredient)
                res.render("myaccount/new", {title: 'Add A Recipe', ingredient, ingredients});
            });
        });
    });
}

function createIngredient(req, res) {
    req.body.share = !!req.body.share
    Ingredient.create(req.body, function(err, ingredient){
        Ingredient.find({}, function(err, ingredients){
            res.render("myaccount/new", {title: 'Add A Recipe', ingredient, ingredients});
        });
    });
}