const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({path:"./config.env"});
const port = process.env.PORT || 4000;

const socketio = require("socket.io")
const http = require("http")
const server = http.createServer(app)
//const io = require("socket.io")(server);//socketio(server, { wsEngine: "ws" });
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        allowedHeaders: ["my-custom-header"],
        credentials: true
      }
});

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");


app.use(cors());
app.use(express.json());
app.use(require("./routes/user"))
app.use(require("./routes/profile"))
app.use(require("./routes/createProject"))
app.use(require("./routes/otherProfile"))
app.use(require("./routes/viewProjects"))
app.use(require("./routes/updateUserProject"))
app.use(require("./routes/settings"))
const dbo = require("./db/conn");

// from: https://javascript.plainenglish.io/build-your-own-realtime-chat-app-with-mern-stack-c5908ba75126
//kod från: https://github.com/XenoverseUp/chatter

io.on("connection", socket => {
	console.log("connected");

	socket.on("join", ({ name, room }) => {
		const { error, user } = addUser({ id: socket.id, name, room });
		if (error) {
			return;
		}
		console.log("joined");

		socket.emit("message", {
			user: "admin",
			text: `${user.name}, welcome to the room!`,
		});

		socket.broadcast.to(user.room).emit("message", {
			user: "admin",
			text: `${user.name} has joined to room.`,
		});

		socket.join(user.room);

		io.to(user.room).emit("roomData", {
			room: user.room,
			users: getUsersInRoom(user.room),
		});
	});

	socket.on("sendMessage", async (message, callback) => {
		const user = await getUser(socket.id);

		try {
			io.to(user.room).emit("message", { user: user.name, text: message });
			io.to(user.room).emit("roomData", {
				room: user.room,
				users: getUsersInRoom(user.room),
			});
			callback();
		} catch (err) {
			console.log(err.message);
		}
	});

	socket.on("disconnect", () => {
		const user = removeUser(socket.id);
		console.log("disconnected");

		if (user) {
			io.to(user.room).emit("message", {
				user: "admin",
				text: `${user.name} has just left!`,
			});
		}
	});
});

// app.listen(port, () => {
server.listen(port, () => {
    dbo.connectToServer(function(err){
        if (err) console.error(err);

    });
    console.log('server is running on port: '+ port);
});
