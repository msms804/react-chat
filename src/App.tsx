import { useState } from 'react'
import './App.css'
import ChatContainer from './components/ChatContainer'

function App() {

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello Tailwind with vite
      </h1>
      <ChatContainer />
    </>
  )
}

export default App
