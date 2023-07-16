import { useEffect, useState, useCallback } from 'react'
import './App.css'
import { Navigate, Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import Contacts from './pages/Contacts/Contacts'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ContactForm from './components/Contact Form/ContactForm'
import logo from '../src/assets/logo-full.png'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [currPage, setCurrPage] = useState("home")

  useEffect(() => {
    const currentPathname = location.pathname.split('/')[1];

    setCurrPage(currentPathname || 'home');
  }, [location]);

  useEffect(() => {
    if (currPage !== 'login' && currPage !== 'register' && currPage !== 'update-contact') {
      document.getElementsByClassName('active')[0].classList.remove('active');
      document.getElementById(currPage).classList.add('active');
    }
  }, [currPage])

  const handleClick = useCallback((id) => {
    if (id === "home") {
      navigate('/')
    }
    else if (id === "add-contact") {
      navigate('/add-contact')
    }
    else if (id === "logout") {
      navigate('/')
    }
    else if (id == "register") {
      navigate('/register')
    }
    else if (id == "login") {
      navigate('/login')
    }
  }, [navigate])

  const token = localStorage.getItem('token');

  return (
    <>
      <Routes>
        <Route path="/" Component={() => {
          // return token ? <Contacts /> : Navigate({ to: '/login' });
          return (
            token ? <Contacts /> :
              (
                <>
                  <div className='home-login-container'>
                    <p>Log in or Register</p>
                    <button id='login' onClick={() => {
                      handleClick('login');
                    }}>Login</button>
                    <button id='register' onClick={() => {
                      handleClick("register")
                    }}>Register</button>
                  </div>
                </>
              )
          );
        }} />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={() => {
          return token ? <Contacts /> : <Login />;
        }} />
        <Route path="*" Component={Login} />

        <Route path="/add-contact" Component={() => {
          return token ? <ContactForm currPage={currPage} setCurrentPage={setCurrPage} /> : Navigate({ to: '/login' });
        }} />
        <Route path="/update-contact/:contact_id" Component={() => {
          return token ? <ContactForm currPage={currPage} setCurrentPage={setCurrPage} /> : Navigate({ to: '/login' });
        }} />
      </Routes>

      <div className='top-bar'>
        <div className='logo'>
          <img src={logo} alt='logo' onClick={() => { navigate('/') }} />
        </div>

        <div className='user'>
          {token ? <p>{localStorage.getItem('name')}</p> : <p>LOGGED OUT</p>}
        </div>
      </div>

      <div className='navbar'>
        <div className='curr-path'>
          <p>c.{currPage}</p>
        </div>
        <div className='nav-btns'>
          <button id='home' className='active' onClick={() => {
            handleClick("home");
          }}>Home</button>

          {
            token ? (
              <button id='add-contact' onClick={() => {
                handleClick("add-contact");
              }}>Add Contact</button>
            ) : null
          }

          {
            token ? (
              <button id='logout' onClick={() => {
                handleClick("logout");
                localStorage.removeItem('token')
              }}>Logout</button>
            ) : null
          }
        </div>
      </div>
    </>
  )
}

export default App
