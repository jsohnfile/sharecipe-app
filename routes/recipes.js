const express = require('express');
const router = express.Router();

const recipesCtrl = require('../controllers/recipes');

router.get('/', recipesCtrl.index);
router.post('/search', recipesCtrl.search)
router.get('/:id', recipesCtrl.show);
router.post('/:id/comments', isLoggedIn, recipesCtrl.create)
router.delete('/:id/comments/:cid', isLoggedIn, recipesCtrl.delete)

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}


module.exports = router;

