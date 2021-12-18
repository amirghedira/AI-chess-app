import React from 'react'
import { Row, Col, Container, Button } from 'reactstrap'
import classes from './GamePage.module.css'
import {
    getBishopMoves,
    getKnightMoves,
    getPawnMoves,
    getKingMoves,
    getRockMoves,
    isCheckedKing,
    checkPieceMovePreventKingCheck,
    checkPiecePreventKingCheck,
    getPassedPawn,
    addBoardImage,
    cleanBoardImage
} from '../../utils/GameFunctions'
import EndGameModal from './EndGameModal/EndGameModal'
import {
    WHITE_KING,
    WHITE_KNIGHT,
    WHITE_QUEEN,
    WHITE_ROCK, WHITE_PAWN,
    WHITE_BISHOP,
    BLACK_BISHOP,
    BLACK_KING,
    BLACK_KNIGHT,
    BLACK_PAWN,
    BLACK_QUEEN,
    BLACK_ROCK
} from '../../utils/Pieces'
import PromotePieceModal from './PromotePieceModal/PromotePieceModal'
import GlobalContext from '../../context/GlobalContext'
import axios from '../../utils/axios'
import GameInvitationModal from './GameInvitationModal/GameInvitationModal'
import Board from '../../components/Board/Board'
import LoadingGameModal from './LoadingGameModal/LoadingGameModal'
import RejectedGameModal from './RejectedGameModal/RejectedGameModal'
import FindPlayerModal from './FindPlayerModal/FindPlayerModal'

const GamePage = () => {

    const [boardState, setBoardState] = React.useState(null)
    const [clickedBox, setClickedBox] = React.useState(null)
    const [currentTeam, setCurrentTeam] = React.useState('white')
    const [pieceSuggestions, setPieceSuggestions] = React.useState([])
    const [isKingChecked, setIsKingChecked] = React.useState(null)
    const [lastMove, setLastMove] = React.useState(null)
    const [allowedWhiteCastling, setAllowedWhiteCastling] = React.useState({ kingSide: true, queenSide: true })
    const [allowedBlackCastling, setAllowedBlackCastling] = React.useState({ kingSide: true, queenSide: true })
    const [displayedBoard, setDisplayedBoard] = React.useState(null)
    const [eatedPieces, setEatedPieces] = React.useState([])
    const [previsousBoards, setPreviousBoards] = React.useState([])
    const [currentBoardIndex, setCurrentBoardIndex] = React.useState(0)
    const [isGameEnded, setIsGameEnded] = React.useState(true)
    const [endGameInfoModal, setEndGameInfoModal] = React.useState({ isOpen: false })
    const [promotePieceModal, setPromotePieceModal] = React.useState({ isOpen: false })
    const [timer, setTimer] = React.useState({ black: '05:00', white: '05:00' })
    const [oponent, setOponent] = React.useState(null)
    const timerInterval = React.useRef(null)
    const context = React.useContext(GlobalContext)
    const [isOpenInvitationGame, setIsOpenInvitationGame] = React.useState(false)
    const [game, setGame] = React.useState(null)
    const [loadingModal, setLoadingModal] = React.useState(false)
    const [isOpenRejectedGame, setIsOpenRejectedGame] = React.useState({ isOpen: false })
    const [isOpenFindPlayerModal, setIsOpenFindPlayerModal] = React.useState(false)
    React.useEffect(() => {
        if (!context.user)
            return window.location.href = '/login'
        initGame()
        context.socket.on('receive-invitation-game', ({ oponent, game }) => {
            setGame(game)
            context.setOponent(oponent)
            setIsOpenInvitationGame(true)
        })
        context.socket.on('accepted-challenge', ({ oponent, game }) => {
            initGame()
            setOponent({ ...oponent })
            context.setOponent({ ...oponent })
            setGame(game)
            setLoadingModal(false)
            setIsGameEnded(false)
        })
        context.socket.on('abandaned-game', () => {
            setGame((_game) => {
                let wonTeam
                if (_game.oponents.white === context.user._id)
                    wonTeam = 'white'
                else
                    wonTeam = 'black'
                setEndGameInfoModal({
                    isOpen: true,
                    title: `${wonTeam} won`,
                    userScore: context.user.score,
                    score: `${_game.oponents[wonTeam] === context.user._id ? '+7' : '-7'}`,
                    description: `${wonTeam} won by abandant`
                })
                return { ..._game, winnerTeam: wonTeam, result: 'abandant' }
            })
            setIsGameEnded(true)
        })
        context.socket.on('rejected-challenge', ({ oponent }) => {
            context.setOponent({ ...oponent })
            setIsOpenRejectedGame({
                isOpen: true,
                message: `${oponent.username} has rejected your challenge`
            })
            setLoadingModal(false)
        })
        // eslint-disable-next-line
    }, [])


    React.useEffect(() => {
        if (!isGameEnded) {
            context.socket.off('played-move')
            context.socket.on('played-move', ({ boardGame, lastMove }) => {
                const receivedBoard = addBoardImage(boardGame)

                setCurrentTeam((team) => {
                    return team === 'white' ? 'black' : 'white'
                })
                setIsKingChecked(null)
                setBoardState(JSON.parse(JSON.stringify(receivedBoard)))
                setLastMove(lastMove)
            })
        } else {
            context.socket.off('played-move')

        }

        // eslint-disable-next-line
    }, [isGameEnded])


    React.useEffect(() => {
        if (boardState)
            setPreviousBoards((_previousBoards) => {
                setCurrentBoardIndex(_previousBoards.length)
                const newPreviousBoards = JSON.parse(JSON.stringify([..._previousBoards
                    , JSON.parse(JSON.stringify(boardState))]))
                return newPreviousBoards

            })
    }, [boardState])

    React.useEffect(() => {
        if (game && isGameEnded && endGameInfoModal.isOpen) {
            if (game.winnerTeam !== 'none') {
                if (game.oponents[game.winnerTeam] === context.user._id) {
                    context.setUser({ ...context.user, score: context.user.score + 7 })
                    setOponent({ ...oponent, score: oponent.score - 7 })
                } else {
                    context.setUser({ ...context.user, score: context.user.score - 7 })
                    setOponent({ ...oponent, score: oponent.score + 7 })
                }
            }
            clearInterval(timerInterval.current)

            if (context.user._id === game.oponents.black)
                return
            axios.patch(`/game/${game._id}`, { game })
                .then(res => {
                })
        }
        // eslint-disable-next-line
    }, [game, isGameEnded, endGameInfoModal])
    React.useEffect(() => {
        setDisplayedBoard(previsousBoards[currentBoardIndex])
    }, [currentBoardIndex, previsousBoards])

    React.useEffect(() => {
        if (!isGameEnded) {
            let duration = (+timer[currentTeam].split(':')[0] * 60 + +timer[currentTeam].split(':')[1])
            var time = duration, minutes, seconds;
            if (timerInterval.current)
                clearInterval(timerInterval.current)

            minutes = parseInt(time / 60, 10);
            seconds = parseInt(time % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            setTimer({ ...timer, [currentTeam]: minutes + ":" + seconds })
            if (--time < 0) {
                clearInterval(timerInterval.current)
                let wonTeam = currentTeam === 'white' ? 'black' : 'white'
                setEndGameInfoModal({
                    isOpen: true,
                    title: `${wonTeam} won`,
                    userScore: context.user.score,
                    score: `${game.oponents[wonTeam] === context.user._id ? '+7' : '-7'}`,
                    description: `${wonTeam} won by time`
                })
                setGame({ ...game, winnerTeam: wonTeam, result: 'time' })
                setIsGameEnded(true)
            }
            timerInterval.current = setInterval(function () {
                minutes = parseInt(time / 60, 10);
                seconds = parseInt(time % 60, 10);
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                setTimer({ ...timer, [currentTeam]: minutes + ":" + seconds })
                if (--time < 0) {
                    clearInterval(timerInterval.current)
                    let wonTeam = currentTeam === 'white' ? 'black' : 'white'
                    setEndGameInfoModal({
                        isOpen: true,
                        title: `${wonTeam} won`,
                        userScore: context.user.score,
                        score: `${game.oponents[wonTeam] === context.user._id ? '+7' : '-7'}`,
                        description: `${wonTeam} won by time`
                    })
                    setGame({ ...game, winnerTeam: wonTeam, result: 'time' })
                    setIsGameEnded(true)
                }
            }, 1000);
        }
        // eslint-disable-next-line
    }, [isGameEnded, currentTeam])
    const getPiecePossibleMoves = (box) => {
        let possibleMoves = []

        switch (box.piece?.piece) {
            case 'pawn': {
                possibleMoves = getPawnMoves(boardState, box, currentTeam, lastMove)
                break;
            }
            case 'bishop': {
                possibleMoves = getBishopMoves(boardState, box, currentTeam)
                break;
            }
            case 'queen': {

                possibleMoves = [...getBishopMoves(boardState, box, currentTeam), ...getRockMoves(boardState, box, currentTeam)]
                break;
            }
            case 'rock': {
                possibleMoves = getRockMoves(boardState, box, currentTeam)
                break;
            }
            case 'knight': {
                possibleMoves = getKnightMoves(boardState, box, currentTeam)

                break;
            }
            case 'king': {
                possibleMoves = getKingMoves(boardState, box, currentTeam)

                if (currentTeam === 'black') {
                    if (allowedBlackCastling.kingSide && !boardState[0][5] && !boardState[0][6] &&
                        isCheckedKing(boardState, currentTeam, { row: 0, box: 5 }).length === 0 &&
                        isCheckedKing(boardState, currentTeam, { row: 0, box: 6 }).length === 0) {
                        possibleMoves = [...possibleMoves, { row: 0, box: 6 }]
                    }
                    if (allowedBlackCastling.queenSide && !boardState[0][1] && !boardState[0][2] && !boardState[0][3] &&
                        isCheckedKing(boardState, currentTeam, { row: 0, box: 2 }).length === 0 &&
                        isCheckedKing(boardState, currentTeam, { row: 0, box: 3 }).length === 0) {
                        possibleMoves = [...possibleMoves, { row: 0, box: 2 }]
                    }

                } else {
                    if (allowedWhiteCastling.kingSide && !boardState[7][5] && !boardState[7][6] &&
                        isCheckedKing(boardState, currentTeam, { row: 7, box: 5 }).length === 0 &&
                        isCheckedKing(boardState, currentTeam, { row: 7, box: 6 }).length === 0) {
                        possibleMoves = [...possibleMoves, { row: 7, box: 6 }]
                    }
                    if (allowedWhiteCastling.queenSide && !boardState[7][1] && !boardState[7][2] && !boardState[7][3] &&
                        isCheckedKing(boardState, currentTeam, { row: 7, box: 2 }).length === 0 &&
                        isCheckedKing(boardState, currentTeam, { row: 7, box: 3 }).length === 0) {
                        possibleMoves = [...possibleMoves, { row: 7, box: 2 }]
                    }
                }
                break;
            }
            default:
                break;
        }
        if (isKingChecked) {
            possibleMoves = possibleMoves.filter(possibleMove => {
                return checkPieceMovePreventKingCheck(boardState, currentTeam, box, possibleMove, isKingChecked, lastMove)
            })
        }
        return possibleMoves
    }

    React.useEffect(() => {
        if (boardState) {
            if (!clickedBox)
                return setPieceSuggestions([]);

            const possibleMoves = getPiecePossibleMoves(clickedBox)
            setPieceSuggestions([...possibleMoves])
        }
        // eslint-disable-next-line
    }, [boardState, clickedBox])

    React.useEffect(() => {
        if (boardState) {

            let kingBox = null
            let i = 0;
            let j;
            while (i < 8 && !kingBox) {
                j = 0;
                while (j < 8 && !kingBox) {
                    if (boardState[i][j]?.piece === 'king' && boardState[i][j].team === currentTeam) {
                        kingBox = { row: i, box: j }
                    }
                    j++
                }
                i++
            }
            const checkingPiecesPositions = isCheckedKing(boardState, currentTeam, kingBox)
            if (checkingPiecesPositions.length > 0)
                setIsKingChecked({ team: currentTeam, ...kingBox, checkByPositions: checkingPiecesPositions })
        }
        if (oponent && !isGameEnded) {
            let _boardState = []
            boardState.forEach(row => {
                let _row = []
                row.forEach(box => {
                    _row.push({ ...box, img: '' })
                })
                _boardState.push(_row)
            })
        }

        // eslint-disable-next-line
    }, [boardState])

    React.useEffect(() => {

        if (!boardState || !game)
            return
        let foundPawn = false
        let foundRock = false
        let foundQueen = false
        let i = 0
        let j = 0

        while (!(foundPawn || foundRock || foundQueen) && i <= 7) {
            j = 0
            while (!(foundPawn || foundRock || foundQueen) && j <= 7) {
                if (boardState[i][j]) {
                    if (boardState[i][j].piece === 'pawn') {
                        foundPawn = true

                    }
                    if (boardState[i][j].piece === 'queen') {
                        foundQueen = true
                    }
                    if (boardState[i][j].piece === 'rock') {
                        foundRock = true
                    }
                }
                j++

            }
            i++

        }
        if (!foundPawn && !foundRock && !foundQueen) {
            i = 0
            j = 0
            let countWhiteBishop = 0
            let countBlackBishop = 0
            let countWhiteKnight = 0
            let countBlackKnight = 0
            while (i <= 7) {
                j = 0
                while (j <= 7) {
                    if (boardState[i][j]) {
                        if (boardState[i][j].piece === 'bishop') {
                            if (boardState[i][j].team === 'white') {
                                countWhiteBishop++
                            } else {
                                countBlackBishop++
                            }

                        }
                        if (boardState[i][j].piece === 'knight') {
                            if (boardState[i][j].team === 'white') {
                                countWhiteKnight++
                            } else {
                                countBlackKnight++
                            }
                        }
                    }
                    j++

                }
                i++

            }
            if (countBlackKnight + countWhiteBishop + countWhiteKnight + countBlackBishop <= 2) {
                setIsGameEnded(true)
                setGame({ ...game, winnerTeam: 'none', result: 'materials' })
                return setEndGameInfoModal({
                    isOpen: true,
                    userScore: context.user.score,
                    score: 0,
                    title: 'Draw !',
                    description: 'Insufficient mating material'
                })

            }

        }
        let foundMove = false

        i = 0
        j = 0

        while (!foundMove && i <= 7) {
            j = 0
            while (!foundMove && j <= 7) {
                if (!boardState[i][j] || boardState[i][j].team !== currentTeam)
                    j++
                else {
                    const possibleMoves = getPiecePossibleMoves({ piece: boardState[i][j], row: i, box: j })
                    if (possibleMoves.length > 0) {
                        foundMove = true
                    }
                    j++

                }
            }
            i++
        }
        if (foundMove) {
            return
        } else {
            if (isKingChecked) {
                let wonTeam = ''
                if (currentTeam === 'white') {
                    wonTeam = 'black'
                } else {
                    wonTeam = 'white'

                }

                setEndGameInfoModal({
                    isOpen: true,
                    title: `${wonTeam} won`,
                    userScore: context.user.score,
                    score: `${game.oponents[wonTeam] === context.user._id ? '+7' : '-7'}`,
                    description: `${wonTeam} won by checkmate`
                })

                setGame({ ...game, winnerTeam: wonTeam, result: 'checkmate' })

            } else {
                setEndGameInfoModal({
                    isOpen: true,
                    title: 'Draw !',
                    userScore: context.user.score,
                    score: 0,
                    description: 'Game drawn by stalemate'
                })
                setGame({ ...game, winnerTeam: 'none', result: 'stalemate' })

            }
            clearInterval(timerInterval.current)
            setIsGameEnded(true)
        }
        // eslint-disable-next-line
    }, [isKingChecked, boardState, currentTeam])

    const initGame = () => {
        const _boardState = [
            [BLACK_ROCK, BLACK_KNIGHT, BLACK_BISHOP, BLACK_QUEEN, BLACK_KING, BLACK_BISHOP, BLACK_KNIGHT, BLACK_ROCK],
            [1, 2, 3, 4, 5, 6, 7, 8].map(i => BLACK_PAWN),
            [1, 2, 3, 4, 5, 6, 7, 8].map(i => null),
            [1, 2, 3, 4, 5, 6, 7, 8].map(i => null),
            [1, 2, 3, 4, 5, 6, 7, 8].map(i => null),
            [1, 2, 3, 4, 5, 6, 7, 8].map(i => null),
            [1, 2, 3, 4, 5, 6, 7, 8].map(i => WHITE_PAWN),
            [WHITE_ROCK, WHITE_KNIGHT, WHITE_BISHOP, WHITE_QUEEN, WHITE_KING, WHITE_BISHOP, WHITE_KNIGHT, WHITE_ROCK],
        ]
        setGame(null)
        setEatedPieces([])
        setAllowedBlackCastling({ kingSide: true, queenSide: true })
        setAllowedWhiteCastling({ kingSide: true, queenSide: true })
        setBoardState(_boardState)
        setIsKingChecked(null)
        setEndGameInfoModal({})
        setLastMove(null)
        setCurrentTeam('white')
        setClickedBox(null)
        setOponent(null)
        setIsOpenRejectedGame({ isOpen: false })
        setTimer({ black: '05:00', white: '05:00' })
    }

    const clickedPieceHandler = async (row, box) => {
        if (isGameEnded)
            return
        if (currentBoardIndex !== previsousBoards.length - 1)
            return
        if (game.oponents[currentTeam] !== context.user._id)
            return
        if (isKingChecked && isKingChecked.team === currentTeam) {
            if (!clickedBox) {
                if (boardState[row][box]) {
                    if (!checkPiecePreventKingCheck(boardState, currentTeam, { row, box }, isKingChecked, lastMove))
                        return setClickedBox(null)

                }
            } else {
                if (!checkPieceMovePreventKingCheck(boardState, currentTeam, clickedBox, { row, box }, isKingChecked, lastMove))
                    return setClickedBox(null)
            }
        }
        if (!(boardState[row][box]) || boardState[row][box].team !== currentTeam) {
            const _boardState = JSON.parse(JSON.stringify(boardState));
            if (isValidNextGame(row, box)) {
                if (isKingChecked)
                    setIsKingChecked(null)
                _boardState[clickedBox.row][clickedBox.box] = null;
                if (clickedBox.piece.piece === 'king') {
                    if (currentTeam === 'black') {
                        if (row === 0 && box === 2 && allowedBlackCastling.queenSide) {

                            _boardState[row][box] = clickedBox.piece
                            _boardState[row][3] = _boardState[row][0]
                            _boardState[row][0] = null
                            setBoardState([..._boardState])
                            setPieceSuggestions([])
                            setClickedBox(null)
                            setCurrentTeam('white')
                            return

                        } else if (row === 0 && box === 6 && allowedBlackCastling.kingSide) {
                            _boardState[row][box] = clickedBox.piece
                            _boardState[row][5] = _boardState[row][7]
                            _boardState[row][7] = null
                            setBoardState([..._boardState])
                            setPieceSuggestions([])
                            setClickedBox(null)
                            setCurrentTeam('white')
                            return
                        }

                    } else {
                        if (row === 7 && box === 2 && allowedWhiteCastling.queenSide) {
                            _boardState[row][box] = clickedBox.piece
                            _boardState[row][3] = _boardState[row][0]
                            _boardState[row][0] = null

                            setBoardState([..._boardState])
                            setPieceSuggestions([])
                            setClickedBox(null)
                            setCurrentTeam('black')

                            return
                        } else if (row === 7 && box === 6 && allowedWhiteCastling.kingSide) {

                            _boardState[row][box] = clickedBox.piece
                            _boardState[row][5] = _boardState[row][7]
                            _boardState[row][7] = null
                            setBoardState([..._boardState])
                            setPieceSuggestions([])
                            setClickedBox(null)
                            setCurrentTeam('black')

                            return
                        }
                    }
                }
                if (clickedBox.piece && clickedBox.piece.piece === 'pawn') {
                    const passedPawnMove = getPassedPawn(currentTeam, clickedBox, lastMove)
                    if (passedPawnMove) {
                        if (passedPawnMove.row === row && passedPawnMove.box === box) {
                            if (currentTeam === 'black')
                                _boardState[row - 1][box] = null
                            else
                                _boardState[row + 1][box] = null


                        }
                    }

                    if ((currentTeam === 'black' && row === 7) || (currentTeam === 'white' && row === 0)) {

                        setPromotePieceModal({
                            isOpen: true,
                            position: { row, box }
                        })
                        setPieceSuggestions([])
                        setClickedBox(null)
                        return

                    }
                }

                if (boardState[row][box]) {
                    setEatedPieces([...eatedPieces, boardState[row][box]])
                }
                _boardState[row][box] = clickedBox.piece

                setBoardState([..._boardState])
                setCurrentTeam((team) => {
                    if (team === 'white') {
                        if (clickedBox.piece.piece === 'rock') {
                            if (clickedBox.box === 0) {
                                setAllowedWhiteCastling({ ...allowedWhiteCastling, queenSide: false })

                            } else {
                                setAllowedWhiteCastling({ ...allowedWhiteCastling, kingSide: false })

                            }
                        }
                        if (clickedBox.piece.piece === 'king' && allowedWhiteCastling)
                            setAllowedWhiteCastling({ kingSide: false, queenSide: false })
                        return 'black'
                    }
                    if (clickedBox.piece.piece === 'king' && allowedBlackCastling)
                        setAllowedBlackCastling({ kingSide: false, queenSide: false })
                    if (clickedBox.piece.piece === 'rock') {
                        if (clickedBox.box === 0) {
                            setAllowedBlackCastling({ ...allowedBlackCastling, queenSide: false })

                        } else {
                            setAllowedBlackCastling({ ...allowedBlackCastling, kingSide: false })

                        }
                    }
                    clearInterval(timerInterval.current)
                    return 'white'
                })
                setLastMove({ from: { ...clickedBox }, to: { row, box }, piece: clickedBox.piece.piece })
                context.socket.emit('make-move', { userId: oponent._id, boardGame: cleanBoardImage(_boardState), lastMove: { from: { ...clickedBox }, to: { row, box }, piece: clickedBox.piece.piece } })
            }
            setPieceSuggestions([])
            setClickedBox(null)
            await axios.patch(`/game/move/${game._id}`, { move: JSON.stringify(cleanBoardImage(_boardState)) })

        }
        else if (checkClickedPiece(row, box) || boardState[row][box].team !== currentTeam)
            setClickedBox(null)
        else
            setClickedBox({ row, box, piece: boardState[row][box] })

    }
    const checkClickedPiece = (row, box) => {
        if (!clickedBox)
            return false
        return (clickedBox.row === row && clickedBox.box === box)
    }

    const checkCheckedKing = (row, box) => {
        if (!isKingChecked)
            return false
        return (isKingChecked.row === row && isKingChecked.box === box)
    }

    const checkPositionIncludedInSuggestions = (rowIndex, boxIndex) => {
        let result = false
        let i = 0
        while (!result && i < pieceSuggestions.length) {
            if (pieceSuggestions[i].row === rowIndex && pieceSuggestions[i].box === boxIndex)
                result = true

            i++
        }
        return result
    }

    const isValidNextGame = (rowIndex, boxIndex) => {
        return checkPositionIncludedInSuggestions(rowIndex, boxIndex) && checkNoKingCheckNextMove(rowIndex, boxIndex)
    }

    const checkNoKingCheckNextMove = (rowIndex, boxIndex) => {

        if (!clickedBox) {
            return true
        }
        if (clickedBox.piece.piece === 'king')
            return true
        let kingPosition
        const boardCopy = JSON.parse(JSON.stringify(boardState))
        boardState.forEach((row, rowIndex) => {
            row.forEach((box, boxIndex) => {
                if (box && box.piece === 'king' && box.team === currentTeam) {
                    kingPosition = { row: rowIndex, box: boxIndex }
                }
            })
        })
        boardCopy[clickedBox.row][clickedBox.box] = null;
        boardCopy[rowIndex][boxIndex] = clickedBox.piece
        if (isCheckedKing(boardCopy, currentTeam, kingPosition).length > 0)
            return false
        return true
    }


    const setDisplayedBoardHandler = (sign) => {

        if (sign === '+') {
            if (currentBoardIndex < previsousBoards.length - 1)
                setCurrentBoardIndex(currentBoardIndex + 1)

        } else {
            if (currentBoardIndex > 0)
                setCurrentBoardIndex(currentBoardIndex - 1)

        }
    }
    const choosePromotedPieceHandler = (piece) => {
        const _boardState = [...boardState]
        let oponentTeam = ''
        if (currentTeam === 'black') {
            oponentTeam = 'white'
            _boardState[promotePieceModal.position.row - 1][promotePieceModal.position.box] = null

        } else {
            oponentTeam = 'black'
            _boardState[promotePieceModal.position.row + 1][promotePieceModal.position.box] = null

        }
        _boardState[promotePieceModal.position.row][promotePieceModal.position.box] = piece
        setBoardState([..._boardState])
        setPromotePieceModal({ isOpen: false })
        setCurrentTeam(oponentTeam)
    }

    const getScoreTeam = (team) => {
        eatedPieces.filter(eatedPiece => eatedPiece.team === 'white')
            .map(piece => +piece.value)
            .reduce((prevV, currentV) => {
                return prevV + currentV
            }, 0)
    }
    const startNewGameAfteraGameHandler = () => {
        initGame()
        startNewGameHandler()
    }
    const rematchHandlerAfterEndGame = () => {
        setEndGameInfoModal({ isOpen: false })
        rematchHandler()
    }
    const rematchHandlerAfterReject = () => {
        setIsOpenRejectedGame({ isOpen: false })
        rematchHandler()
    }
    const rematchHandler = () => {
        axios.post(`/game/player/${context.oponent._id}`)
            .then((res) => {
                setLoadingModal(true)
            })
            .catch(err => {
                setIsOpenRejectedGame({
                    isOpen: true,
                    message: `${context.oponent.username} is not available`
                })
            })
    }
    const startNewGameHandler = () => {
        setLoadingModal(true)
        axios.post('/game', { board: JSON.stringify(cleanBoardImage(boardState)) })
            .then(res => {
            })
            .catch(err => {
                console.log(err)
            })
    }
    const acceptGameHandler = () => {

        context.socket.emit('accept-challenge', { userId: context.oponent._id, oponent: context.user, game: game })
        setOponent({ ...context.oponent })
        setIsGameEnded(false)
        setIsOpenInvitationGame(false)

    }
    const rejectGameHandler = () => {
        setIsOpenInvitationGame(false)
        context.socket.emit('reject-challenge', { userId: context.oponent._id, oponent: context.user })


    }
    const selectPlayerHandler = (player) => {
        axios.post(`/game/player/${player._id}`)
            .then((res) => {
                setGame(res.data.game)
                setIsOpenFindPlayerModal(false)
                setLoadingModal(true)
            })
            .catch(err => {
                setIsOpenRejectedGame({
                    isOpen: true,
                    message: `${player.username} is not available`
                })
            })
    }
    const abandantGameHandler = () => {
        context.socket.emit('abandant-game', { userId: oponent._id, oponent: context.user })
        let wonTeam
        if (game.oponents.white === context.user._id)
            wonTeam = 'black'
        else
            wonTeam = 'white'
        setEndGameInfoModal({
            isOpen: true,
            title: `${wonTeam} won`,
            userScore: context.user.score,
            score: `${game.oponents[wonTeam] === context.user._id ? '+7' : '-7'}`,
            description: `${wonTeam} won by abandant`
        })
        setGame({ ...game, winnerTeam: wonTeam, result: 'abandant' })
        setIsGameEnded(true)

    }
    const isFlippedBoard = () => {
        if (!game || !oponent)
            return false

        return game.oponents.black === context.user._id
    }
    if (!displayedBoard)
        return null
    return (
        <Container fluid className={classes.mainContainer}>
            <LoadingGameModal isOpen={loadingModal} />
            <FindPlayerModal
                isOpen={isOpenFindPlayerModal}
                selectedPlayer={selectPlayerHandler}
                toggle={() => { setIsOpenFindPlayerModal(!isOpenFindPlayerModal) }} />
            <RejectedGameModal
                isOpen={isOpenRejectedGame.isOpen}
                toggle={() => setIsOpenRejectedGame({ isOpen: !isOpenRejectedGame.isOpen })}
                onNewGame={startNewGameAfteraGameHandler}
                onRematch={rematchHandlerAfterReject}
                message={isOpenRejectedGame.message}
            />
            <GameInvitationModal
                isOpen={isOpenInvitationGame}
                onAccept={acceptGameHandler}
                onReject={rejectGameHandler}
                username={context.oponent?.username}
            />
            <EndGameModal
                onRematch={rematchHandlerAfterEndGame}
                onNewGame={startNewGameAfteraGameHandler}
                isOpen={endGameInfoModal.isOpen} toggle={() => { setEndGameInfoModal({ ...endGameInfoModal, isOpen: false }) }}
                title={endGameInfoModal.title} description={endGameInfoModal.description}
                userScore={endGameInfoModal.userScore}
                score={endGameInfoModal.score} />
            <PromotePieceModal isOpen={promotePieceModal.isOpen}
                toggle={() => setPromotePieceModal({ isOpen: false })}
                team={currentTeam}
                choosePromotedPiece={choosePromotedPieceHandler} />
            <Row style={{ height: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                <Col xs="2">
                </Col>
                <Col xs="8">
                    <Row className={classes.mainUserInfoContainer}>
                        <Col style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex' }}>
                                <div className={classes.imageContainer}>
                                    <img className={classes.userImage} alt="user" src={'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png'} />
                                </div>
                                <div className={classes.userInfoContainer}>
                                    {oponent ?
                                        <h5 className={classes.userNameText}>{oponent.username} ({oponent.score})</h5>
                                        :
                                        <h5 className={classes.userNameText}>Oponent</h5>}
                                    <div style={{ display: 'flex' }}>
                                        {eatedPieces.filter(eatedPiece => eatedPiece.team === 'black').map((piece, key) => {
                                            return <div className={classes.pieceImgEated} key={key} style={{ backgroundImage: `url(${piece.img})` }} />
                                        })}
                                        <h5 style={{ fontSize: '12px', color: 'rgb(110,110,110)' }}>{
                                            getScoreTeam('black')
                                        }</h5>
                                    </div>
                                </div>
                            </div>
                            {
                                isFlippedBoard() ?
                                    <div className={classes.timerContainer} style={{ backgroundColor: currentTeam === 'white' ? 'rgb(150,150,150)' : 'rgb(20,10,20)' }}>
                                        <h5 className={classes.timerText} style={{ color: currentTeam === 'white' ? 'black' : 'white' }}>{timer.white}</h5>
                                    </div>
                                    :
                                    <div className={classes.timerContainer} style={{ backgroundColor: currentTeam === 'black' ? 'rgb(150,150,150)' : 'rgb(20,10,20)' }}>
                                        <h5 className={classes.timerText} style={{ color: currentTeam === 'black' ? 'black' : 'white' }}>{timer.black}</h5>
                                    </div>
                            }

                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Board
                                checkClickedPiece={checkClickedPiece}
                                checkCheckedKing={checkCheckedKing}
                                activeBox={clickedBox}
                                clickedPiece={clickedPieceHandler}
                                board={displayedBoard}
                                isValidNextGame={isValidNextGame}
                                lastMove={lastMove}
                                currentTeam={currentTeam}
                                isFlippedBoard={isFlippedBoard()} />
                        </Col>
                    </Row>
                    <Row className={classes.mainUserInfoContainer}>
                        <Col style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex' }}>
                                <div className={classes.imageContainer}>
                                    <img className={classes.userImage} alt="user" src={'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/22.png'} />
                                </div>
                                <div className={classes.userInfoContainer}>
                                    <h5 className={classes.userNameText}>{context.user.username} ({context.user.score})</h5>
                                    <div style={{ display: 'flex' }}>
                                        {eatedPieces.filter(eatedPiece => eatedPiece.team === 'white').map((piece, key) => {
                                            return <div className={classes.pieceImgEated} key={key} style={{ backgroundImage: `url(${piece.img})` }} />
                                        })}
                                        <h5 style={{ fontSize: '12px', color: 'rgb(110,110,110)' }}>{
                                            getScoreTeam('white')
                                        }</h5>
                                    </div>

                                </div>
                                <div style={{ marginLeft: '10px' }}>
                                    <i className={'fas fa-chevron-left'} style={{ cursor: 'pointer', fontSize: '20px', color: 'white', marginLeft: '5px', marginRight: '5px' }} onClick={() => { setDisplayedBoardHandler('-') }}></i>
                                    <i className={'fas fa-chevron-right'} style={{ cursor: 'pointer', fontSize: '20px', color: 'white', marginLeft: '5px', marginRight: '5px' }} onClick={() => { setDisplayedBoardHandler('+') }}></i>
                                </div>
                            </div>
                            {
                                isFlippedBoard() ?
                                    <div className={classes.timerContainer} style={{ backgroundColor: currentTeam === 'black' ? 'rgb(150,150,150)' : 'rgb(20,10,20)' }}>
                                        <h5 className={classes.timerText} style={{ color: currentTeam === 'black' ? 'black' : 'white' }}>{timer.black}</h5>
                                    </div>
                                    :
                                    <div className={classes.timerContainer} style={{ backgroundColor: currentTeam === 'white' ? 'rgb(150,150,150)' : 'rgb(20,10,20)' }}>
                                        <h5 className={classes.timerText} style={{ color: currentTeam === 'white' ? 'black' : 'white' }}>{timer.white}</h5>
                                    </div>
                            }


                        </Col>
                    </Row>
                </Col>
                <Col xs="2">
                    <Button style={{ marginBottom: '10px', width: '100%' }} onClick={startNewGameHandler}>
                        New Game
                    </Button>
                    <Button style={{ marginBottom: '10px', width: '100%' }} onClick={() => { setIsOpenFindPlayerModal(true) }}>
                        Play with someone
                    </Button>
                    {!isGameEnded && <Button style={{ marginBottom: '10px', width: '100%' }} onClick={abandantGameHandler}>
                        <i className='fas fa-flag'></i>
                    </Button>}
                </Col>
            </Row>
        </Container>
    )
}

export default GamePage
