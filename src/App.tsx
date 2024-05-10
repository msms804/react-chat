import './App.css'
import Main from './pages/Main'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Mypage } from './pages/Mypage'
const queryClient = new QueryClient();
function App() {
  //2h~ 메인페이지 디자인
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/' Component={Main} />
          <Route path='/login' Component={Login} />
          <Route path='/signup' Component={SignUp} />
          <Route path='/mypage' Component={Mypage} />
        </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App
