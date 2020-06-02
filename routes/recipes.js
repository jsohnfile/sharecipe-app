const express = require('express');
const router = express.Router();

const recipesCtrl = require('../controllers/recipes');

router.get('/', recipesCtrl.index);
router.get('/new', isLoggedIn, recipesCtrl.new);
router.get('/myaccount', isLoggedIn, recipesCtrl.myAccount)
router.post('/search', recipesCtrl.search)
router.get('/:id', recipesCtrl.show);
router.post('/', isLoggedIn, recipesCtrl.create);
router.get('/:id/edit', isLoggedIn, recipesCtrl.edit)
router.put('/:id', isLoggedIn, recipesCtrl.update)


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

module.exports = router;

