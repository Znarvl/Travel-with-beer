const express = require("express");


const profileRoute = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;


 profileRoute.route("/profileId/:id").get(function(req, res){
    let db_connect = dbo.getDb("db-name");
     db_connect
         .collection("users")
         .find({_id: ObjectId(req.params.id)})
         .toArray(function(err, result){
             if (err) throw err;
             res.json(result);
         });
 });







module.exports = profileRoute;