const express = require('express');
const router = express.Router();

const ingredientsCtrl = require('../controllers/ingredients');

router.post('/ingredients', isLoggedIn, ingredientsCtrl.create);

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

module.exports = router;