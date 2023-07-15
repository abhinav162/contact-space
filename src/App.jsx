import { useEffect, useState, useCallback } from 'react'
import './App.css'
import { Navigate, Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import Contacts from './pages/Contacts/Contacts'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ContactForm from './components/Contact Form/ContactForm'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [currPage, setCurrPage] = useState("home")

  const handleClick = useCallback((id) => {
    if (id === "home") {
      setCurrPage("home")
      navigate('/')
    }
    else if (id === "add-contact") {
      setCurrPage("add-contact")
      navigate('/add-contact')
    }
    else if (id === "logout") {
      setCurrPage("logout")
      navigate('/')
    }
    else if (id == "register") {
      setCurrPage("register")
      navigate('/register')
    }
    else if (id == "login") {
      setCurrPage("login")
      navigate('/login')
    }
  },[navigate])

  // const handleLoginClick = useCallback(() => {
  //   setCurrPage("login");
  //   navigate('/login');
  // }, [navigate]);

  // const makeActive = (id) => {
  //   const currActive = document.getElementsByClassName('active');
  //   const currId = currActive[0].id

  //   const currPath = window.location.pathname.split('/')[1]
  //   console.log(currPath)
  //   if (currPath === "") { setCurrPage("home") }
  //   else {
  //     setCurrPage(currPath)
  //   }

  //   if (currId !== currPath) {
  //     currActive[0].classList.remove('active');
  //     document.getElementById(id).classList.add('active');
  //   }
  // }

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
                    <a href="/register">Register</a>
                  </div>
                </>
              )
          );
        }} />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={() => {
          return token ? <Contacts /> : <Login currPage={currPage} setCurrentPage={setCurrPage} />;
        }} />
        <Route path="*" Component={Login} />

        <Route path="/add-contact" Component={() => {
          return token ? <ContactForm currPage={currPage} setCurrentPage={setCurrPage} /> : Navigate({ to: '/login' });
        }} />
        <Route path="/update-contact/:contact_id" Component={() => {
          return token ? <ContactForm currPage={currPage} setCurrentPage={setCurrPage} /> : Navigate({ to: '/login' });
        }} />
      </Routes>

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

          {
            token ? (
              null
            ) : <button id='register' onClick={() => {
              handleClick("register");
            }}>Register</button>
          }
        </div>
      </div>
    </>
  )
}

export default App
