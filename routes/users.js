const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user')

router.get('/auth/google',
    passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })
);
router.get('/oauth2callback',
  passport.authenticate('google', {
    successRedirect: '/myaccount',
    failureRedirect: '/'
  })
);
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.put('/user', function(req, res){
  User.find({username: req.body.username}, function(err, checkusername){
    if(checkusername.length){
      res.render('profile', {message: "Username exists. Please Try Again", title: "Create a Username"});
    }else{
      User.findById(req.user.id, function(err, user){
        console.log('user', user)
        console.log('req.body.username', req.body.username)
        user.username = req.body.username
        user.save(function(err){
          if(err){
            console.log('something went wrong')
          }
          console.log("user after add:", user)
          res.redirect('/recipes/myaccount')
        })
      })
    }

  })
})


module.exports = router;
