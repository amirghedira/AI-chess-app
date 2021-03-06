import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GamePage from './pages/GamePage/GamePage';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import AppContext from './context/AppContext'
const App = () => {
    return (
        <AppContext>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/game" element={<GamePage />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </BrowserRouter>
        </AppContext>
    )
}

export default App;
