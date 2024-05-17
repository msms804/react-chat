import './App.css'
import Main from './pages/Main'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Mypage } from './pages/Mypage'
import ChatList from './components/ChatList'
import { Empty } from './components/Empty'
import React, { useRef } from 'react'
const queryClient = new QueryClient();
function App() {
  //2h~ 메인페이지 디자인
  const chatContainerRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/' element={<Main />} >
            <Route path="chats/empty" element={<Empty />} />
            <Route path="chats/:roomId" element={<ChatList forwardedRef={useRef<HTMLDivElement>(null)} />} />
          </Route>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/mypage' element={<Mypage />} />
          {/* <Route path="/chats/:roomId" element={<ChatList forwardedRef={chatContainerRef} />} /> */}

          {/* <Route path='/chats/:roomId' element={<ChatList forwardedRef={React.createRef()}/>}/> */}
        </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App
