import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import routes from './routes/index';
import path from 'path'
import chatGlobal from './models/chatGlobal';
// middleware
const app = express()

const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
})


app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())

//Routes
app.use('/api/auth', routes.authRouter)
app.use('/api' , routes.userRouter)
app.use('/api' , routes.categoryRouter)
app.use('/api' , routes.questionRouter)
app.use('/api' , routes.courseRouter)
app.use('/api' , routes.historyRouter)
app.use('/api' , routes.chatGlobal)

// socket io

io.on("connection", (socket : any) => {

  socket.on("sendDataClient", async function(data:any) { // Handle khi có sự kiện tên là sendDataClient từ phía client
    if(data) {
      const rows = new chatGlobal({
        userId: data.userId,
        content: data.content.trim(),
        time: data.time,
        user: data.user,
      });
    
      await rows.save();
      // io.emit("getId" , rows._id);
    }
    io.emit("sendDataServer", { data }); // phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
  });
});

import './config/database'

if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/dist'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'))
  })
}

// server listenning
const POST = process.env.PORT || 5000
http.listen(POST, function() {
  console.log('listening on port ', POST)
})
