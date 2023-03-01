const express = require("express");

const profileProjectRoute = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

//Dummy to debug
profileProjectRoute.route("/cans/find/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myProjectquery ={"users.email": req.body.email};
    console.log(req.params.id)
    db_connect
    .collection("projects")
    .find(myProjectquery)
    .toArray(function(err, result){
        if (err) throw err;
        response.json(result);
    });
});

   // Add can and meters to projects user
   profileProjectRoute.route("/cans/project/user/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myProjectquery ={_id: ObjectId(req.params.id), "users.email": req.body.email};
    let myProjectUpdate =  { $inc: { "users.$.cans": 1 , "users.$.meters": 0.2 }}

      db_connect
      .collection("projects")
      .updateOne(myProjectquery,myProjectUpdate , function (err, res) {
        if (err) throw err;
        response.json(res);
      });

   });
   
   // Add bottle and meters to projects user
   profileProjectRoute.route("/bottles/project/user/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myProjectquery ={_id: ObjectId(req.params.id), "users.email": req.body.email};
    let myProjectUpdate =  { $inc: { "users.$.bottles": 1 , "users.$.meters": 0.3 }}

      db_connect
      .collection("projects")
      .updateOne(myProjectquery,myProjectUpdate , function (err, res) {
        if (err) throw err;
        response.json(res);
      });

   });

   profileProjectRoute.route("/project/info/:id").get(function(req, res){
    let db_connect = dbo.getDb("db-name");

     db_connect
         .collection("projects")
         .find({_id: ObjectId(req.params.id)})
         .toArray(function(err, result){
             if (err) throw err;
             res.json(result);
         });
 });

   //Add can and meters to user profile
   profileProjectRoute.route("/cans/user/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myUserQuery ={email: req.body.email};

    let myUserUpdate = { $inc: { cans: 1, meters: 0.2 }} //Granges flask height

    db_connect
    .collection("users")
    .updateOne(myUserQuery, myUserUpdate, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
   });

   profileProjectRoute.route("/bottles/user/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myUserQuery ={email: req.body.email};

    let myUserUpdate = { $inc: { bottles: 1, meters: 0.3 }} //Wine bottle height

    db_connect
    .collection("users")
    .updateOne(myUserQuery, myUserUpdate, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
   });

     //Add total meters to the project
     profileProjectRoute.route("/cans/project/add/:id").post(function (req, response) {
        let db_connect = dbo.getDb();
        let myUserQuery ={_id: ObjectId(req.params.id)};
        console.log(myUserQuery)
    
        let myUserUpdate = { $inc: { cans: 1, meters: 0.2 }}
    
        db_connect
        .collection("projects")
        .updateOne(myUserQuery, myUserUpdate, function (err, res) {
          if (err) throw err;
          response.json(res);
        });
       });

       //Add total meters to the project
       profileProjectRoute.route("/bottles/project/add/:id").post(function (req, response) {
        let db_connect = dbo.getDb();
        let myUserQuery ={_id: ObjectId(req.params.id)};
    
        let myUserUpdate = { $inc: { bottles: 1, meters: 0.3 }}
    
        db_connect
        .collection("projects")
        .updateOne(myUserQuery, myUserUpdate, function (err, res) {
          if (err) throw err;
          response.json(res);
        });
       });
  

  //Add new users to existning project
  profileProjectRoute.route("/project/add/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
      $push: {
        users: {
          'email':req.body.email,
          'meters': 0,
          'cans': 0,
          'bottles': 0},
          userList: req.body.email //To check if user is in the project
      },
    };
    db_connect
      .collection("projects")
      .updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        response.json(res);
      });
   });

   //If user has been in the project before it will resume from where he ended
   profileProjectRoute.route("/project/add/oldUser/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
      $push: { userList: req.body.email 
      },
    };
    db_connect
      .collection("projects")
      .updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        response.json(res);
      });
   });
    

module.exports = profileProjectRoute;