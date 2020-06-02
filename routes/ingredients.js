const express = require('express');
const router = express.Router();

const ingredientsCtrl = require('../controllers/ingredients');

router.post('/ingredients', ingredientsCtrl.create);
router.delete('/ingredients/:id', ingredientsCtrl.delete)

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

module.exports = router;