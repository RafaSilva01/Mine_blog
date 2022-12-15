import './App.css';

// Ligações
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import { onAuthStateChanged } from 'firebase/auth';
// O  onAuthStateChangeda mapeia se a autenticação foi feita com sucesso

// Hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

// Contexto
import { AuthProvider } from './context/AutcContext';

// Paginas
import Home from './pages/home/Home';
import About from './pages/about/About';
import Login from './pages/login/Login';
import Register from './pages/registre/Register';
import CreatePost from './pages/CreatePost/CreatePost';
import DashBoard from './pages/DashBoard/DashBoard';
import Search from './pages/search/Search';
import Post from './pages/post/Post';
import EditePost from './pages/EditPost/EditePost';


// Componentes
import NavBar from './components/NavBar';
import Footer from './components/Footer';





function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user)=> {
      setUser(user)
    })

  }, [auth])

  if(loadingUser){
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <NavBar />
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/About' element={<About/>}/>
              <Route path='/search' element={<Search/>}/>
              <Route path='/posts/:id' element={<Post/>}/>
              <Route 
              path='/login' 
              element={!user ? <Login/> : <Navigate to="/"/>}/>
              <Route 
              path='/Register' 
              element={!user ? <Register/> : <Navigate to="/" />}/>
              {/* Usuario */}
              <Route 
              path='/posts/edit/:id' 
              element={user ? <EditePost/> : <Navigate to="/login"/> }/>
              <Route 
              path='/posts/Create' 
              element={user ? <CreatePost/> : <Navigate to="/login"/> }/>
              <Route 
              path='/DashBoard' 
              element={user  ? <DashBoard/> :<Navigate to="/login"/> }/>
              <Route></Route>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
