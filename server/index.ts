import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import routes from './routes/index';

// middleware
const app = express()

const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())

//Routes
app.use('/api/auth' , routes.authRouter)
app.use('/api' , routes.userRouter)
app.use('/api' , routes.categoryRouter)
app.use('/api' , routes.questionRouter)
app.use('/api' , routes.courseRouter)

import './config/database'

// socket io

io.on("connection", (socket : any) => {

  socket.on("sendDataClient", function(data:any) { // Handle khi có sự kiện tên là sendDataClient từ phía client
    io.emit("sendDataServer", { data });// phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
  });
});



// server listenning
const POST = process.env.PORT || 5000
http.listen(POST, function() {
  console.log('listening on port ', POST)
})
