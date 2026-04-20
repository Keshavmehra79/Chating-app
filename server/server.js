const express=require("express");
const http=require("http");
const {Server}=require('socket.io')
const cors=require("cors");
const app=express();
app.use(cors())

const server=http.createServer(app);

const io=new Server(server,{
     cors:{
        origin:'http://localhost:5173',
        methods:['GET','POST']
    }
})

io.on("connection",(socket)=>{
    console.log(`Socket stabliished succefully:${socket.id}`);
    socket.on("send_message",(data)=>{
        console.log(data)
    io.emit('receive_message',{data:data.message,time:data.time})

    })    
})





server.listen(9000,()=>{
    console.log("Server run on 9000 port ")
})