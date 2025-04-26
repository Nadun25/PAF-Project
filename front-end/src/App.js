import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import VideosPage from './pages/videosPage/VideosPage';
import Profile from './pages/profile/Profile';
import Chat from './pages/chatPage/ChatPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home/:userName" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/videos/:userName" element={<VideosPage />} />
          <Route path="/profile/:userName/:profileUser" element={<Profile />} />
          <Route path="/chat/:userName/:sender" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;