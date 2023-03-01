const express = require("express");


const profileRoute = express.Router();

const dbo = require("../db/conn");


profileRoute.route("/profile/:email").get(function(req, res){
    let db_connect = dbo.getDb("db-name");
     db_connect
         .collection("users")
         .find({email: req.params.email})
         .toArray(function(err, result){
             if (err) throw err;
             res.json(result);
         });
 });




module.exports = profileRoute;
