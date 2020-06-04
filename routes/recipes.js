const express = require('express');
const router = express.Router();

const recipesCtrl = require('../controllers/recipes');

router.get('/', recipesCtrl.index);
router.get('/new', isLoggedIn, recipesCtrl.new);
router.get('/myaccount', hasUsername, isLoggedIn, recipesCtrl.myAccount)
router.post('/search', recipesCtrl.search)
router.get('/:id', recipesCtrl.show);
router.delete('/:id', isLoggedIn, recipesCtrl.delete);
router.put('/ingredient/:id', isLoggedIn, recipesCtrl.addIngredient)
router.put('/ingredient/:id/:idx', isLoggedIn, recipesCtrl.updateIngredients)
router.post('/', isLoggedIn, recipesCtrl.create);
router.get('/:id/edit', isLoggedIn, recipesCtrl.edit)
router.put('/:id', isLoggedIn, recipesCtrl.update)


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

function hasUsername(req, res, next) {
    if(req.user.username) return next();
    res.redirect('/profile');
  }

module.exports = router;

