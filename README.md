# TDDD27_2022

Advanced Web Programming course

## Functional specification

In our project we are developing a social app drinking bevareges and stacking the length of these beverages from one location to another. 
The basic concept is that you can have one or more challenges together with other users that you contribute to. You contribute by drinking a drink and the length of that drink-can is added to a length goal (for example, you set up a distance between Linköping and Mjölby and one can contribute 15 cm to that distance). 

Except for contributing to a challenge with x amount of a certain drink (for example we can set that one drink is 15 cm long and you can only use that). One should be able to communicate with the others that are members of a challenge through a common chat that is avalable for everyone inside the challenge. 

Requirements:

- One should be able to log-in and log-out to the application.
- The user can be part of several challenges at the same time and contribute to all of them at the same time. 
- The user should be able to create new challenges and invite people to them. 
- When creating a challenge you set a start location and an end location. A progress bar and total amount of drinks contributed should be visible for the challenge.
- The members of a challenge should be able to chat with each other over a communal challenge-chat. 
- A user should be able to see his/her total amount of drinks contributed. 

## Technical specification

We will use a MERN stack for our project, which includes MongoDB, Express.js, Node.js and react. We will also use typecript with react

### Client frame work
We will use typescript with react.

To start the client, go into the /client folder, then type 'npm start'. 

### server/backend
In the backend we will use express.js and node.js with mongoDB atlas. We belive using atlas will be easier using than keeping the DB on a locale machine. 

To start the server, go into the /server folder, then type 'node server.js'. Make sure you have all the necesary dependensies, such as react. 

