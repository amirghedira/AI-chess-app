import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GamePage from './pages/GamePage/GamePage';

const App = () => {
    return (

        <BrowserRouter>
            <Routes>
                <Route path="/game" element={<GamePage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
