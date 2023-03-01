const express = require("express");


const projectRoute = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

//create new project
projectRoute.route("/project/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
      name: req.body.name,
      totMeters: parseInt(req.body.totMeters),
      meters: 0,
      cans: 0,
      bottles: 0,
      users: [{
        'email':req.body.users,
        'meters':0,
        'cans': 0,
        'bottles': 0}], //User can leave but the progess will stay same
      admin: req.body.admin,
      userList: [req.body.users] //To check if user is in the project
    };
    db_connect.collection("projects").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  });

// Add project to user 
projectRoute.route("/user/project/add/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $push: {
      project: req.body.project 
    },
  }
  db_connect
    .collection("users")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      response.json(res);
  });
});


   //Remove user from project, the users contribution will still be active in theproject and user page
   projectRoute.route("/project/remove/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
      $pull: {
          userList: req.body.email //To check if user is in the project
      }
    };
    db_connect
      .collection("projects")
      .updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        response.json(res);
      });
   });

   projectRoute.route("/projects/getProject/:id").get(function (req, res){
    let db_connect = dbo.getDb();
    db_connect
         .collection("projects")
         .find({_id: ObjectId(req.params.id)})
         .toArray(function(err, result){
             if (err) throw err;
             res.json(result);
         });
   });

module.exports = projectRoute;
