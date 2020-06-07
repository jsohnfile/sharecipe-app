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

router.put('/users', function(req, res){
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
          res.redirect('/myaccount')
        })
      })
    }

  })
})

router.put('/users/:id', function(req,res){
  console.log(req.user, "<--req.user")
  console.log(req.user._id,"req.user._id")
  User.findById(req.user._id, function(err, user){
    let value = user.favorites.includes(req.params.id)
    if(value) {
      let idx = user.favorites.indexOf(req.params.id);
      user.favorites.splice(idx, 1);
    }else {
      user.favorites.push(req.params.id);
    }
    user.save(function(err){
      console.log(user, "<----user")
      res.redirect(`/recipes/${req.params.id}`)
    });
  });
});


module.exports = router;
