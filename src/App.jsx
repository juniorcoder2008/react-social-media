import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import OwnPosts from './pages/OwnPosts';

const App = () => {

  return (
    <Router forceRefresh={true}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/own-posts' element={<OwnPosts />} />
      </Routes>
    </Router>
  )
}

export default App