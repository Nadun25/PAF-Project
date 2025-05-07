import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import LearnPlansPage from './pages/learnPlansPage/LearnPlansPage.jsx';
import WorkoutPlanPage from './pages/workoutsPage/WorkoutsPage';
import SupplementPage from './pages/supplementsPage/SupplementsPage';
import VideosPage from './pages/videosPage/VideosPage';
import WorkoutStatusPage from './pages/workoutStatusPage/WorkoutStatusPage';
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
          <Route path="/mealPlanes/:userName" element={<LearnPlansPage />} />
          <Route path="/workoutPlans/:userName" element={<WorkoutPlanPage />} />
          <Route path="/supplements/:userName" element={<SupplementPage />} />
          <Route path="/videos/:userName" element={<VideosPage />} />
          <Route path="/currentWorkoutStatus/:userName" element={<WorkoutStatusPage />} />
          <Route path="/profile/:userName/:profileUser" element={<Profile />} />
          <Route path="/messages/:userName" element={<Messages />} />
          <Route path="/chat/:userName/:sender" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;