import { useState } from 'react'
import React from 'react'
import { Navbar } from './components/Navbar'
import { Register } from './components/Register'
import { Login } from './components/Login'
import { Home } from './components/Home'
import { CreatePin } from './components/CreatePin'
import { Profile } from './components/Profile'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostState from './context/posts/postState'
import NavbarState from './context/posts/NavbarState'
import { Notificationitem } from './components/Notificationitem'
import { NotificationCard } from './components/NotificationCard'
import { SearchBar } from './components/SearchBar'
import { SearchBarCard } from './components/SearchBarCard'
import { ClientViewProfile } from './components/ClientViewProfile'
import { FindPinCard } from './components/FindPin'
function App() {

  return (
    <>
      <Router>
        <PostState>
          <NavbarState>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createpin" element={<CreatePin />} />
            <Route path="/userprofile/:id" element={<ClientViewProfile />} />
          </Routes>
          </NavbarState>
        </PostState>
      </Router>
    </>
  )
}
  
export default App
