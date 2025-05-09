import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import MealPlansPage from './pages/learnPlansPage/LearnPlansPage';
import VideosPage from './pages/videosPage/VideosPage';
import Profile from './pages/profile/Profile';
import Messages from './pages/messagePage/MessagePage';
import Chat from './pages/chatPage/ChatPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home/:userName" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mealPlanes/:userName" element={<MealPlansPage />} />
          <Route path="/videos/:userName" element={<VideosPage />} />
          <Route path="/profile/:userName/:profileUser" element={<Profile />} />
          <Route path="/messages/:userName" element={<Messages />} />
          <Route path="/chat/:userName/:sender" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;