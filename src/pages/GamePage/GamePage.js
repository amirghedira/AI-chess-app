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
import whitePawnPieceImg from '../../assets/pieces/white_pawn.png'
import blackPawnPieceImg from '../../assets/pieces/black_pawn.png'
import blackRockPieceImg from '../../assets/pieces/black_rock.png'
import whiteRockPieceImg from '../../assets/pieces/white_rock.png'
import whiteKingPieceImg from '../../assets/pieces/white_king.png'
import blackKingPieceImg from '../../assets/pieces/black_king.png'
import blackbishopPieceImg from '../../assets/pieces/black_bishop.png'
import whitebishopPieceImg from '../../assets/pieces/white_bishop.png'
import whiteknightPieceImg from '../../assets/pieces/white_knight.png'
import blackknightPieceImg from '../../assets/pieces/black_knight.png'
import blackQueenPieceImg from '../../assets/pieces/black_queen.png'

import whiteQueenPieceImg from '../../assets/pieces/white_queen.png'

const WHITE_PAWN = { piece: 'pawn', team: 'white', value: '1', img: whitePawnPieceImg }
const WHITE_ROCK = { piece: 'rock', team: 'white', value: '5', img: whiteRockPieceImg }
const WHITE_QUEEN = { piece: 'queen', team: 'white', value: '9', img: whiteQueenPieceImg }
const WHITE_KNIGHT = { piece: 'knight', team: 'white', value: '3', img: whiteknightPieceImg }
const WHITE_KING = { piece: 'king', team: 'white', value: '0', img: whiteKingPieceImg }
const WHITE_BIPHOP = { piece: 'bishop', team: 'white', value: '9', img: whitebishopPieceImg }

const BLACK_PAWN = { piece: 'pawn', team: 'black', value: '1', img: blackPawnPieceImg }
const BLACK_ROCK = { piece: 'rock', team: 'black', value: '5', img: blackRockPieceImg }
const BLACK_QUEEN = { piece: 'queen', team: 'black', value: '9', img: blackQueenPieceImg }
const BLACK_KNIGHT = { piece: 'knight', team: 'black', value: '3', img: blackknightPieceImg }
const BLACK_KING = { piece: 'king', team: 'black', value: '0', img: blackKingPieceImg }
const BLACK_BIPHOP = { piece: 'bishop', team: 'black', value: '9', img: blackbishopPieceImg }


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

    React.useEffect(() => {
        // const _boardState = [
        //     [BLACK_ROCK, BLACK_KNIGHT, BLACK_BIPHOP, BLACK_QUEEN, BLACK_KING, BLACK_BIPHOP, BLACK_KNIGHT, BLACK_ROCK],
        //     [1, 2, 3, 4, 5, 6, 7, 8].map(i => BLACK_PAWN),
        //     [1, 2, 3, 4, 5, 6, 7, 8].map(i => null),
        //     [1, 2, 3, 4, 5, 6, 7, 8].map(i => null),
        //     [1, 2, 3, 4, 5, 6, 7, 8].map(i => null),
        //     [1, 2, 3, 4, 5, 6, 7, 8].map(i => null),
        //     [1, 2, 3, 4, 5, 6, 7, 8].map(i => WHITE_PAWN),
        //     [WHITE_ROCK, WHITE_KNIGHT, WHITE_BIPHOP, WHITE_QUEEN, WHITE_KING, WHITE_BIPHOP, WHITE_KNIGHT, WHITE_ROCK],
        // ]
        const _boardState = [
            [null, null, null, null, BLACK_KING, null, null, null],
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
        let foundMove = false

        let i = 0
        let j = 0

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
                console.log('you lost')
            } else {
                console.log('draw')
            }
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

                    return 'white'
                })
                setLastMove({ from: { ...clickedBox }, to: { row, box }, piece: clickedBox.piece.piece })
                if (isKingChecked)
                    setIsKingChecked(null)
                const _boardState = [...boardState];
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
                    console.log(clickedBox)

                    if (currentTeam === 'black') {
                        console.log(clickedBox)
                        if (row === 7) {
                            console.log('promote')
                        }
                    }
                    else {
                        if (row === 0) {
                            console.log('promote')
                        }
                    }
                }

                if (boardState[row][box]) {
                    setEatedPieces([...eatedPieces, boardState[row][box]])
                }
                _boardState[row][box] = clickedBox.piece

                setBoardState([..._boardState])
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
    if (!displayedBoard)
        return null
    return (
        <Container fluid className={classes.mainContainer}>
            <Row style={{ height: '100%', alignItems: 'center', display: 'flex' }}>
                <Col xs="1">
                    {eatedPieces.filter(eatedPiece => eatedPiece.team === 'white').map((piece, key) => {
                        return <div className={classes.pieceImg} key={key} style={{ backgroundImage: `url(${piece.img})`, height: '50px', width: '50px' }} />
                    })}
                </Col>
                <Col className={classes.boardContainer}>
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
                <Col xs="1">
                    {eatedPieces.filter(eatedPiece => eatedPiece.team === 'black').map((piece, key) => {
                        return <div className={classes.pieceImg} key={key} style={{ backgroundImage: `url(${piece.img})`, height: '50px', width: '50px' }} />
                    })}
                </Col>
            </Row>
            <Row>
                <Col>
                    <button onClick={() => { setDisplayedBoardHandler('+') }}>+</button>
                    <button onClick={() => { setDisplayedBoardHandler('-') }}>-</button>
                </Col>
            </Row>
        </Container>
    )
}

export default GamePage
