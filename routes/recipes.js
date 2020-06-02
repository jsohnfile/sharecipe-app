const express = require('express');
const router = express.Router();

const recipesCtrl = require('../controllers/recipes');

router.get('/', recipesCtrl.index);
router.get('/new', recipesCtrl.new);
router.get('/myaccount', recipesCtrl.myAccount)
router.post('/search', recipesCtrl.search)
router.get('/:id', recipesCtrl.show);
router.post('/', recipesCtrl.create);
router.get('/:id/edit', recipesCtrl.edit)
router.put('/:id', recipesCtrl.update)


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

module.exports = router;

