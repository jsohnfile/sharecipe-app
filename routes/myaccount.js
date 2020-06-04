const express = require('express');
const router = express.Router();
const myaccountCtrl = require('../controllers/myaccount');

router.get('/', hasUsername, isLoggedIn, myaccountCtrl.index)
router.get('/new', isLoggedIn, myaccountCtrl.new);
router.put('/', isLoggedIn, myaccountCtrl.edit)
router.get('/:id', isLoggedIn, myaccountCtrl.show)
router.delete('/:id', isLoggedIn, myaccountCtrl.delete)
router.post('/', isLoggedIn, myaccountCtrl.create);
router.get('/:id/edit', isLoggedIn, myaccountCtrl.edit)
router.put('/:id', isLoggedIn, myaccountCtrl.update)
router.put('/ingredient/:id', isLoggedIn, myaccountCtrl.addIngredient)
router.put('/ingredient/:id/:idx', isLoggedIn, myaccountCtrl.updateIngredients)

module.exports = router;

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

function hasUsername(req, res, next) {
    if(req.user.username) return next();
    res.redirect('/profile');
  }
