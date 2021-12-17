

const Game = require('../models/Game')
const User = require('../models/User')
const socket = require('socket.io-client')('http://localhost:5000')
exports.getGame = async (req, res) => {
    try {
        const game = await Game.findOne({ _id: gameId })
        res.status(200).json({ game })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
exports.updateGame = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
exports.getUserGames = async (req, res) => {
    try {
        const games = await Game.find({
            $or: [
                { 'oponent.white': req.user._id },
                { 'oponent.black': req.user._id },
            ]
        })
        res.status(200).json({ games })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
exports.createNewGame = async (req, res) => {
    try {
        const availableUser = await User.findOne({ _id: { $nin: req.user._id }, isOnline: true })
        const currentUser = await User.findOne({ _id: req.user._id })

        if (!availableUser)
            return res.status(404).json({ message: 'oponent not found' })
        const createdGame = await Game.create({
            date: new Date().toISOString(),
            oponents: {
                white: req.user._id,
                black: availableUser._id
            },
        })
        socket.emit('start-game', { userId: availableUser._id, oponent: currentUser, game: createdGame })
        res.status(200).json({ game: createdGame })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}