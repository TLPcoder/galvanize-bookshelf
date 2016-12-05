"use strict"

const express = require('express');
const knex = require('../knex');
// eslint-disable-next-line new-cap
const router = express.Router();
const bcrypt = require("bcrypt");
const boom = require('boom');

// YOUR CODE HERE
router.get("/token", function(req, res) {
  console.log(req.headers, "headers")
  console.log(req.cookies, "cookie")
    if (req.cookies['/token'] === 'cookie.monster.zoo') {
        res.status(200).json(true);
    } else {
        res.status(200).json(false);
    }
});

router.post("/token", function(req, res, next) {
    var profile;
    knex('users').where("email", req.body.email)
        .then(function(user) {
            profile = user[0];
            if (!user[0].email) {
                throw new Error();
            }
             if(!bcrypt.compareSync(req.body.password, user[0].hashed_password)){
              throw new Error();
            }
        }).then(function() {
            res.cookie('/token', 'cookie.monster.zoo', {
                path: '/',
                httpOnly: true
            });
            res.json({
                id: profile.id,
                first_name: profile.first_name,
                last_name: profile.last_name,
                email: profile.email
            });
        }).catch(function() {
            res.status(400).send('Bad email or password');
        });
});

router.delete("/token", function(req, res) {
    res.clearCookie("/token", {
        path: "/",
        httpOnly: true
    });
    res.status(200).json(true);
});


module.exports = router;
