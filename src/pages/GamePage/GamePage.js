import React from 'react'
import { Row, Col, Container } from 'reactstrap'
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
    isFreeBox
} from '../../utils/GameFunctions'
import EndGameModal from './EndGameModal/EndGameModal'
import {
    WHITE_BIPHOP,
    WHITE_KING,
    WHITE_KNIGHT,
    WHITE_QUEEN,
    WHITE_ROCK, WHITE_PAWN,
    BLACK_BIPHOP,
    BLACK_KING,
    BLACK_KNIGHT,
    BLACK_PAWN,
    BLACK_QUEEN,
    BLACK_ROCK
} from '../../utils/Pieces'
import PromotePieceModal from './PromotePieceModal/PromotePieceModal'


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
    const [isGameEnded, setIsGameEnded] = React.useState(false)
    const [endGameInfoModal, setEndGameInfoModal] = React.useState({ isOpen: false })
    const [promotePieceModal, setPromotePieceModal] = React.useState({ isOpen: false })
    const [timer, setTimer] = React.useState({ black: '05:30', white: '05:30' })
    const timerInterval = React.useRef(null)
    React.useEffect(() => {
        const _boardState = [
            [BLACK_ROCK, BLACK_KNIGHT, BLACK_BIPHOP, BLACK_QUEEN, BLACK_KING, BLACK_BIPHOP, BLACK_KNIGHT, BLACK_ROCK],
            [1, 2, 3, 4, 5, 6, 7, 8].map(i => BLACK_PAWN),
            [1, 2, 3, 4, 5, 6, 7, 8].map(i => null),
            [1, 2, 3, 4, 5, 6, 7, 8].map(i => null),
            [1, 2, 3, 4, 5, 6, 7, 8].map(i => null),
            [1, 2, 3, 4, 5, 6, 7, 8].map(i => null),
            [1, 2, 3, 4, 5, 6, 7, 8].map(i => WHITE_PAWN),
            [WHITE_ROCK, WHITE_KNIGHT, WHITE_BIPHOP, WHITE_QUEEN, WHITE_KING, WHITE_BIPHOP, WHITE_KNIGHT, WHITE_ROCK],
        ]
        setEatedPieces([])
        setAllowedBlackCastling({ kingSide: true, queenSide: true })
        setAllowedWhiteCastling({ kingSide: true, queenSide: true })
        setBoardState(_boardState)
        setIsKingChecked(null)
        setLastMove(null)
        setCurrentTeam('white')
        setClickedBox(null)
    }, [])

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
        setDisplayedBoard(previsousBoards[currentBoardIndex])
    }, [currentBoardIndex, previsousBoards])

    React.useEffect(() => {
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
            let wonTeam = currentTeam === 'white' ? 'Black' : 'White'
            setEndGameInfoModal({
                isOpen: true,
                title: `${wonTeam} won`,
                description: `${wonTeam} won by time`
            })
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
                let wonTeam = currentTeam === 'white' ? 'Black' : 'White'
                setEndGameInfoModal({
                    isOpen: true,
                    title: `${wonTeam} won`,
                    description: `${wonTeam} won by time`
                })
                setIsGameEnded(true)
            }
        }, 1000);
        // eslint-disable-next-line
    }, [currentTeam])
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

        // eslint-disable-next-line
    }, [boardState])

    React.useEffect(() => {

        if (!boardState)
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
                return setEndGameInfoModal({
                    isOpen: true,
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
                    wonTeam = 'Black'
                } else {
                    wonTeam = 'White'

                }
                setEndGameInfoModal({
                    isOpen: true,
                    title: `${wonTeam} won`,
                    description: `${wonTeam} won by checkmate`
                })
            } else {
                setEndGameInfoModal({
                    isOpen: true,
                    title: 'Draw !',
                    description: 'Game drawn by stalemate'
                })
            }
            setIsGameEnded(true)
        }
        // eslint-disable-next-line
    }, [isKingChecked, boardState, currentTeam])

    const getColorBox = (rowIndex, boxIndex) => {

        if (rowIndex % 2 === 0) {
            if (boxIndex % 2 === 0)
                return '#D1B486'
            return '#7F5531'
        } else {
            if (boxIndex % 2 === 0)
                return '#7F5531'
            return '#D1B486'
        }

    }

    const clickedPieceHandler = (row, box) => {
        if (isGameEnded)
            return
        if (currentBoardIndex !== previsousBoards.length - 1)
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
            if (isValidNextGame(row, box)) {
                if (isKingChecked)
                    setIsKingChecked(null)
                const _boardState = JSON.parse(JSON.stringify(boardState));
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
                            return

                        } else if (row === 0 && box === 6 && allowedBlackCastling.kingSide) {
                            _boardState[row][box] = clickedBox.piece
                            _boardState[row][5] = _boardState[row][7]
                            _boardState[row][7] = null
                            setBoardState([..._boardState])
                            setPieceSuggestions([])
                            setClickedBox(null)
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
                            return
                        } else if (row === 7 && box === 6 && allowedWhiteCastling.kingSide) {

                            _boardState[row][box] = clickedBox.piece
                            _boardState[row][5] = _boardState[row][7]
                            _boardState[row][7] = null
                            setBoardState([..._boardState])
                            setPieceSuggestions([])
                            setClickedBox(null)
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
            }
            setPieceSuggestions([])
            setClickedBox(null)
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
    const checkIsLastMove = (row, box) => {
        if (!lastMove)
            return false
        return (lastMove.from.row === row && lastMove.from.box === box) || (lastMove.to.row === row && lastMove.to.box === box)
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
    if (!displayedBoard)
        return null
    return (
        <Container fluid className={classes.mainContainer}>
            <EndGameModal
                isOpen={endGameInfoModal.isOpen} toggle={() => { setEndGameInfoModal({ ...endGameInfoModal, isOpen: false }) }}
                title={endGameInfoModal.title} description={endGameInfoModal.description} />
            <PromotePieceModal isOpen={promotePieceModal.isOpen}
                toggle={() => setPromotePieceModal({ isOpen: false })}
                team={currentTeam}
                choosePromotedPiece={choosePromotedPieceHandler} />
            <Row style={{ height: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                <Col xs="8">
                    <Row className={classes.mainUserInfoContainer}>
                        <Col style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex' }}>
                                <div className={classes.imageContainer}>
                                    <img className={classes.userImage} alt="user" src={'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png'} />
                                </div>
                                <div className={classes.userInfoContainer}>
                                    <h5 className={classes.userNameText}>Amir ghedira (900)</h5>
                                    <div style={{ display: 'flex' }}>
                                        {eatedPieces.filter(eatedPiece => eatedPiece.team === 'black').map((piece, key) => {
                                            return <div className={classes.pieceImgEated} key={key} style={{ backgroundImage: `url(${piece.img})` }} />
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className={classes.timerContainer} style={{ backgroundColor: currentTeam === 'black' ? 'rgb(150,150,150)' : 'rgb(20,10,20)' }}>
                                <h5 className={classes.timerText} style={{ color: currentTeam === 'black' ? 'black' : 'white' }}>{timer.black}</h5>
                            </div>

                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div>
                                {displayedBoard.map((row, rowIndex) => (
                                    <div key={rowIndex} className={classes.boardRow}>
                                        {row.map((box, boxIndex) => (
                                            <div key={boxIndex} onClick={() => clickedPieceHandler(rowIndex, boxIndex)}

                                                style={{ backgroundColor: checkCheckedKing(rowIndex, boxIndex) ? '#ad0000' : checkClickedPiece(rowIndex, boxIndex) ? '#B1833E' : checkIsLastMove(rowIndex, boxIndex) ? '#b38b51' : `${getColorBox(rowIndex, boxIndex)}` }}
                                                className={classes.boxContainer}>
                                                {clickedBox && isValidNextGame(rowIndex, boxIndex) && <React.Fragment>
                                                    {isFreeBox(box, currentTeam) === "eat" ? <div className={classes.eatMoveBox}></div>
                                                        :
                                                        <div className={classes.possibleMoveBox}></div>
                                                    }
                                                </React.Fragment>}
                                                {box && <div className={classes.pieceImg} style={{ backgroundImage: `url(${box.img})` }} />}

                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </Col>
                    </Row>
                    <Row className={classes.mainUserInfoContainer}>
                        <Col style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex' }}>
                                <div className={classes.imageContainer}>
                                    <img className={classes.userImage} alt="user" src={'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/22.png'} />
                                </div>
                                <div className={classes.userInfoContainer}>
                                    <h5 className={classes.userNameText}>Amir ghedira (900)</h5>
                                    <div style={{ display: 'flex' }}>
                                        {eatedPieces.filter(eatedPiece => eatedPiece.team === 'white').map((piece, key) => {
                                            return <div className={classes.pieceImgEated} key={key} style={{ backgroundImage: `url(${piece.img})` }} />
                                        })}
                                    </div>
                                </div>
                                <div style={{ marginLeft: '10px' }}>
                                    <i className={'fas fa-chevron-left'} style={{ cursor: 'pointer', fontSize: '20px', color: 'white', marginLeft: '5px', marginRight: '5px' }} onClick={() => { setDisplayedBoardHandler('+') }}></i>
                                    <i className={'fas fa-chevron-right'} style={{ cursor: 'pointer', fontSize: '20px', color: 'white', marginLeft: '5px', marginRight: '5px' }} onClick={() => { setDisplayedBoardHandler('-') }}></i>
                                </div>
                            </div>
                            <div className={classes.timerContainer} style={{ backgroundColor: currentTeam === 'white' ? 'rgb(150,150,150)' : 'rgb(20,10,20)' }}>
                                <h5 className={classes.timerText} style={{ color: currentTeam === 'white' ? 'black' : 'white' }}>{timer.white}</h5>
                            </div>

                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default GamePage
