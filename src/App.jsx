import { useState } from 'react'
import './App.css'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Contacts from './pages/Contacts/Contacts'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ContactForm from './components/Contact Form/ContactForm'

function App() {
  const navigate = useNavigate()
  const [currPage, setCurrPage] = useState("home")

  const makeActive = (id) => {
    const currActive = document.getElementsByClassName('active');
    const currId = currActive[0].id


    setCurrPage(id);
    if (currId !== id) {
      currActive[0].classList.remove('active');
      document.getElementById(id).classList.add('active');
    }
  }

  return (
    <>
      <Routes>
        <Route path="/" Component={() => {
          const token = localStorage.getItem('token');
          return token ? <Contacts /> : Navigate({ to: '/login' });
        }} />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="*" Component={Login} />

        <Route path="/add-contact" Component={() => {
          const token = localStorage.getItem('token');
          return token ? <ContactForm /> : Navigate({ to: '/login' });
        }} />
        <Route path="/update-contact/:contact_id" Component={() => {
          const token = localStorage.getItem('token');
          return token ? <ContactForm /> : Navigate({ to: '/login' });
        }} />
      </Routes>

      <div className='navbar'>
        <div className='curr-path'>
          <p>c.{currPage}</p>
        </div>
        <div className='nav-btns'>
          <button id='home' className='active' onClick={() => {
            makeActive("home");
            navigate('/');
          }}>Home</button>

          <button id='add-contact' onClick={() => {
            makeActive("add-contact")
            navigate('/add-contact');
          }}>Add Contact</button>

          <button id='logout' onClick={() => {
            makeActive("logout")
            navigate('/login');
            localStorage.removeItem('token')
          }}>Logout</button>

          <button id='register' onClick={() => {
            makeActive("register")
            navigate('/register');
          }}>Register</button>
        </div>
      </div>
    </>
  )
}

export default App
