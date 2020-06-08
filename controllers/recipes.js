const Recipe = require('../models/recipe');
const Comment = require('../models/comment');

module.exports = {
    index,
    show,
    search,
    create: createComment,
    delete: deleteComment
}

function deleteComment(req, res){
    Comment.findByIdAndDelete(req.params.cid, function(err){
        Recipe.findById(req.params.id, function(err, recipe){
            Comment.find({}, function(err,comments){
                res.redirect(`/recipes/${recipe._id}`);
            });
        });
    });
}

function createComment(req, res) {
    req.body.user = req.user.id;
    req.body.recipe = req.params.id
    Recipe.findById(req.params.id, function(err, recipe){
        Comment.create(req.body, function(err, comment){
            res.redirect(`/recipes/${recipe._id}`);
        });
    });
}

function search(req, res) {
    Recipe.find({ "ingredients": { "$regex": req.body.search, "$options": "i" }, share: true}, function(err, recipes){
        res.render('recipes/search', {title: 'Sharecipes', recipes})
    });
}

function show(req, res) {
    Recipe.findById(req.params.id).populate('user').exec(function(err, recipe){
        Comment.find({recipe: recipe._id}).populate('user')
        .exec(function(err, comments){
            res.render('recipes/show', {title: recipe.title, recipe, comments})
        });
    });
}

function index(req, res) {
    Recipe.find({share: true},function(err, recipes) {
            res.render('recipes/index', {title: "Sharecipes", recipes})
    });
}

