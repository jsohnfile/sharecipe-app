const Comment = require('../models/comment');
const Recipe = require('../models/recipe');

module.exports = {
  create: createComment
};

function createComment(req, res) {
    req.body.user = req.user.id;
    req.body.recipe = req.params.id
    Recipe.findById(req.params.id, function(err, recipe){
        Comment.create(req.body, function(err, comment){
            res.redirect(`/recipes/${recipe._id}`);
        });
    });
}