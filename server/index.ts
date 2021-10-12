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

// socket io

io.on("connection", (socket : any) => {
  console.log("connection--------------------------------------");

  socket.on('joinRoom', (id : any) => {
    console.log("-----------joinRoom---------",id);
  });

  socket.on('disconnect', () => {
    console.log(socket.id + 'disconnected')
  });

});


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



// server listenning
const POST = process.env.PORT || 5000
http.listen(POST, function() {
  console.log('listening on port ', POST)
})
