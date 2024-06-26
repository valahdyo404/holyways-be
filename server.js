const express = require("express")
const router = require("./src/routes")
const cors = require("cors")
const app = express()

require("dotenv").config()

app.use(express.json())
app.use(cors())

const http = require("http")
const { Server } = require("socket.io")

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
})
require("./src/socket")(io)
app.get("/", async (req, res, next) => {
  try {
		const data = {
			status: "Health Check Success",
			uptime: `${Math.round(process.uptime())} second`,			
		};
    res.status(200).json({ msg: "Holyways Master Service", data });
	}
	catch (error) {
		next(error);
	}
});
//endpoint routing
app.use("/api/v1/", router)
//routing for static file
app.use("/uploads", express.static("uploads"))

//port
const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`)
})
