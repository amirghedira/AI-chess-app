import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GamePage from './pages/GamePage/GamePage';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

const App = () => {
    return (

        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/game" element={<GamePage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
