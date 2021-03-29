const express = require('express');
const router = express.Router();
const myaccountCtrl = require('../controllers/myaccount');

router.get('/', hasUsername, isLoggedIn, myaccountCtrl.index)
router.get('/new', hasUsername, isLoggedIn, myaccountCtrl.new);
router.put('/', hasUsername, isLoggedIn, myaccountCtrl.edit)
router.get('/myfavorites', hasUsername, isLoggedIn, myaccountCtrl.showFavorites)
router.get('/:id', hasUsername, isLoggedIn, myaccountCtrl.show)
router.delete('/:id', hasUsername, isLoggedIn, myaccountCtrl.delete)
router.post('/', hasUsername,isLoggedIn, myaccountCtrl.create);
router.get('/:id/edit', hasUsername,sLoggedIn, myaccountCtrl.edit)
router.put('/:id', hasUsername,isLoggedIn, myaccountCtrl.update)
router.put('/ingredient/:id', hasUsername,sLoggedIn, myaccountCtrl.addIngredient)
router.put('/ingredient/:id/:idx', hasUsername,isLoggedIn, myaccountCtrl.updateIngredients)

module.exports = router;

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

function hasUsername(req, res, next) {
    if(req.user.username) return next();
    res.redirect('/profile');
  }
