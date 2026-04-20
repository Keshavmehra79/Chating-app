import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import {io} from "socket.io-client"
const socket=io("http://localhost:9000")
function App() {
  const [currentime,setcurrentTime]=useState([])
  const time=new Date().toLocaleTimeString('en-US',{hour:"numeric",minute:"numeric" ,hour12:true})
  const [message,setMessage]=useState("")
  const [chat ,setChat]=useState([]);
  const sendMessage=()=>{
    socket.emit("send_message",{message:message,time:time});
    setMessage("");
  }


  useEffect(()=>{
    socket.on("receive_message",(data)=>{
      setChat((prev)=>[...prev,data.data]);
      setcurrentTime((prev)=>[...prev,data.time]);

    });
  },[])


  return (<>
  <div className="h-screen bg-gray-400 flex flex-col items-center justify-center">
      
      {/* Chat Container */}
      <div className="w-full max-w-md h-[90vh] bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-600 text-white text-center py-4 text-xl font-semibold">
          💬 Chatting App
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {chat.length === 0 ? (
            <p className="text-gray-400 text-center mt-10">
              Start chatting...
            </p>
          ) : (
            chat.map((msg, index) => (
              <div
                key={index}
                className="flex justify-end"
              >
                <p className="bg-blue-500 text-white px-4 py-2 rounded-lg max-w-[70%] shadow">
                  {msg}
                </p>
              </div>
            ))
          )}

        </div>

        {/* Input Section */}
        <div className="p-3 border-t flex items-center gap-2 bg-white">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>

      </div>
    </div>

  </>
  )
}

export default App