'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const bcrypt = require("bcrypt");
var knex = require('../knex');


router.post("/users", function(req,res){
  var salt = bcrypt.genSaltSync(10);

  var passwordToSave = bcrypt.hashSync(req.body.password, salt);
  console.log(passwordToSave);
  knex('users')
  .insert({first_name:req.body.first_name, last_name:req.body.last_name, email: req.body.email, hashed_password:passwordToSave,created_at:req.body.created_at, updated_at:req.body.updatedAt})
  .returning(['id','first_name','last_name','email'])
  .then(function(user){
    res.json(user[0]);
  }).catch(function(err){
    console.log(err);
  });
});
// YOUR CODE HERE

module.exports = router;
