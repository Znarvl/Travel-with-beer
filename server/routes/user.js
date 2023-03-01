const express = require("express");

const userRoutes = express.Router();

const dbo = require("../db/conn");

//Debug to get all users
userRoutes.route("/users").get(function(req, res){
    let db_connect = dbo.getDb("db-name");
   //console.log(db_connect)
    db_connect
        .collection("users")
        .find({})
        .toArray(function(err, result){
            if (err) throw err;
            res.json(result);
        });
});

// Get user by mail
userRoutes.route("/user/:email").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { email: req.params.email };
    db_connect
      .collection("users")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});


module.exports = userRoutes;