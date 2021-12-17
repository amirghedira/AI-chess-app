const express = require('express')
const
    {
        getGame,
        updateGame,
        getUserGames,
        createNewGame,

    } = require('../controllers/game')
const AuthGuard = require('../middleware/AuthGuard')
const router = express.Router()



router.post('/', AuthGuard, createNewGame)
router.get('/', AuthGuard, getUserGames)
router.get('/:gameId', AuthGuard, getGame)
router.patch('/', AuthGuard, updateGame)



module.exports = router