import React from 'react'
import { Row, Col, Container } from 'reactstrap'
import classes from './GamePage.module.css'
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



const isFreeBox = (box, team) => {
    if (!box)
        return "empty"

    if (box.team !== team)
        return "eat"
    return false
}

const getBishopMoves = (board, currentPos, team) => {
    let i = currentPos.row + 1;
    let j = currentPos.box + 1;
    let possibleMoves = []
    while (i <= 7 && j <= 7 && isFreeBox(board[i][j], team)) {

        possibleMoves.push({ row: i, box: j })
        if (isFreeBox(board[i][j], team) === 'eat') {
            break;
        }
        i++;
        j++;

    }
    i = currentPos.row - 1;
    j = currentPos.box - 1;
    while (i >= 0 && j >= 0 && isFreeBox(board[i][j], team)) {

        possibleMoves.push({ row: i, box: j })


        if (isFreeBox(board[i][j], team) === 'eat') {
            break;
        }
        i--;
        j--;

    }
    i = currentPos.row - 1;
    j = currentPos.box + 1;
    while (i >= 0 && j <= 7 && isFreeBox(board[i][j], team)) {

        possibleMoves.push({ row: i, box: j })

        if (isFreeBox(board[i][j], team) === 'eat') {
            break;
        }
        i--;
        j++;

    }
    i = currentPos.row + 1;
    j = currentPos.box - 1;
    while (i <= 7 && j >= 0 && isFreeBox(board[i][j], team)) {

        possibleMoves.push({ row: i, box: j })
        if (isFreeBox(board[i][j], team) === 'eat') {
            break;
        }
        i++;
        j--;


    }
    return possibleMoves
}

const getRockMoves = (board, currentPos, team) => {
    let possibleMoves = []
    let i = currentPos.row + 1;
    while (i < 8 && isFreeBox(board[i][currentPos.box], team)) {
        possibleMoves.push({ row: i, box: currentPos.box })
        if (isFreeBox(board[i][currentPos.box], team) === "eat")
            break;
        i++
    }
    i = currentPos.row - 1;
    while (i >= 0 && isFreeBox(board[i][currentPos.box], team)) {
        possibleMoves.push({ row: i, box: currentPos.box })
        if (isFreeBox(board[i][currentPos.box], team) === "eat")
            break;
        i--
    }

    let j = currentPos.box + 1;
    while (j < 8 && isFreeBox(board[currentPos.row][j], team)) {

        possibleMoves.push({ row: currentPos.row, box: j })
        if (isFreeBox(board[currentPos.row][j], team) === "eat")
            break;

        j++
    }
    j = currentPos.box - 1;
    while (j >= 0 && isFreeBox(board[currentPos.row][j], team)) {
        possibleMoves.push({ row: currentPos.row, box: j })
        if (isFreeBox(board[currentPos.row][j], team) === "eat")
            break;

        j--
    }
    return possibleMoves;
}

const getKnightMoves = (board, currentPos, team) => {

    let possibleMoves = []
    if (currentPos.box - 1 >= 0 && currentPos.row + 2 <= 7 && isFreeBox(board[currentPos.row + 2][currentPos.box - 1], team))
        possibleMoves.push({ row: currentPos.row + 2, box: currentPos.box - 1 })


    if (currentPos.box + 1 <= 7 && currentPos.row + 2 <= 7 && isFreeBox(board[currentPos.row + 2][currentPos.box + 1], team))
        possibleMoves.push({ row: currentPos.row + 2, box: currentPos.box + 1 })


    if (currentPos.box - 1 >= 0 && currentPos.row - 2 >= 0 && isFreeBox(board[currentPos.row - 2][currentPos.box - 1], team))
        possibleMoves.push({ row: currentPos.row - 2, box: currentPos.box - 1 })


    if (currentPos.box + 1 <= 7 && currentPos.row - 2 >= 0 && isFreeBox(board[currentPos.row - 2][currentPos.box + 1], team))
        possibleMoves.push({ row: currentPos.row - 2, box: currentPos.box + 1 })



    if (currentPos.box - 2 >= 0 && currentPos.row + 1 <= 7 && isFreeBox(board[currentPos.row + 1][currentPos.box - 2], team))
        possibleMoves.push({ row: currentPos.row + 1, box: currentPos.box - 2 })


    if (currentPos.box + 2 <= 7 && currentPos.row + 1 <= 7 && isFreeBox(board[currentPos.row + 1][currentPos.box + 2], team))
        possibleMoves.push({ row: currentPos.row + 1, box: currentPos.box + 2 })


    if (currentPos.box - 2 >= 0 && currentPos.row - 1 >= 0 && isFreeBox(board[currentPos.row - 1][currentPos.box - 2], team))
        possibleMoves.push({ row: currentPos.row - 1, box: currentPos.box - 2 })


    if (currentPos.box + 2 <= 7 && currentPos.row - 1 >= 0 && isFreeBox(board[currentPos.row - 1][currentPos.box + 2], team))
        possibleMoves.push({ row: currentPos.row - 1, box: currentPos.box + 2 })
    return possibleMoves
}

const getKingMoves = (board, currentPos, team) => {


    let possibleMoves = []
    if (isFreeBox(board[currentPos.row][currentPos.box - 1], team) && currentPos.box - 1 >= 0)
        possibleMoves.push({ row: currentPos.row, box: currentPos.box - 1 })
    if (isFreeBox(board[currentPos.row][currentPos.box + 1], team) && currentPos.box + 1 <= 7)
        possibleMoves.push({ row: currentPos.row, box: currentPos.box + 1 })

    if (currentPos.row + 1 <= 7) {
        if (isFreeBox(board[currentPos.row + 1][currentPos.box - 1], team) && currentPos.box - 1 >= 0)
            possibleMoves.push({ row: currentPos.row + 1, box: currentPos.box - 1 })
        if (isFreeBox(board[currentPos.row + 1][currentPos.box], team))
            possibleMoves.push({ row: currentPos.row + 1, box: currentPos.box })
        if (isFreeBox(board[currentPos.row + 1][currentPos.box + 1], team) && currentPos.box + 1 <= 7)
            possibleMoves.push({ row: currentPos.row + 1, box: currentPos.box + 1 })
    }
    if (currentPos.row - 1 >= 0) {
        if (isFreeBox(board[currentPos.row - 1][currentPos.box - 1], team) && currentPos.box - 1 >= 0)
            possibleMoves.push({ row: currentPos.row - 1, box: currentPos.box - 1 })
        if (isFreeBox(board[currentPos.row - 1][currentPos.box], team))
            possibleMoves.push({ row: currentPos.row - 1, box: currentPos.box })
        if (isFreeBox(board[currentPos.row - 1][currentPos.box + 1], team) && currentPos.box + 1 <= 7)
            possibleMoves.push({ row: currentPos.row - 1, box: currentPos.box + 1 })
    }


    let oponentPieces = []
    board.forEach((rowBoard, rowIndex) => {
        rowBoard.forEach((boxPiece, boxIndex) => {
            if (boxPiece && boxPiece.team !== team)
                oponentPieces.push({ row: rowIndex, box: boxIndex, piece: boxPiece.piece })
        })
    })
    let possibleMovesOponent = []
    oponentPieces.forEach(oponentPiece => {
        switch (oponentPiece.piece) {
            // case 'pawn': {
            //     possibleMovesOponent = [...possibleMovesOponent, ...getPawnMoves(board, { row: oponentPiece.row, box: oponentPiece.box }, team === "white" ? 'black' : 'white')]
            //     break;
            // }
            case 'bishop': {
                possibleMovesOponent = [...possibleMovesOponent, ...getBishopMoves(board, { row: oponentPiece.row, box: oponentPiece.box }, team === "white" ? 'black' : 'white')]
                break;
            }
            case 'queen': {

                possibleMovesOponent = [...possibleMovesOponent, ...getBishopMoves(board, { row: oponentPiece.row, box: oponentPiece.box }, team === "white" ? 'black' : 'white'), ...getRockMoves(board, { row: oponentPiece.row, box: oponentPiece.box }, team === "white" ? 'black' : 'white')]
                break;
            }
            case 'rock': {
                possibleMovesOponent = [...possibleMovesOponent, ...getRockMoves(board, { row: oponentPiece.row, box: oponentPiece.box }, team === "white" ? 'black' : 'white')]
                break;
            }
            case 'knight': {
                possibleMovesOponent = [...possibleMovesOponent, ...getKnightMoves(board, { row: oponentPiece.row, box: oponentPiece.box }, team === "white" ? 'black' : 'white')]
                break;
            }
            default:
                break;
        }
        console.log(oponentPiece.piece)
        console.log(possibleMovesOponent)

    })
    let kingAllowedMoves = []
    console.log(possibleMovesOponent)
    possibleMoves.forEach(possibleMove => {
        let result = false;
        possibleMovesOponent.forEach(possibleMoveOponent => {

            if (possibleMoveOponent.row === possibleMove.row && possibleMove.box === possibleMoveOponent.box)
                result = true
        })
        if (!result)
            kingAllowedMoves.push(possibleMove)
    })
    console.log(kingAllowedMoves)

    return kingAllowedMoves

}


const getPawnMoves = (board, currentPos, team) => {
    let possibleMoves = []
    if (team === 'black') {
        if (currentPos.row === 1) {
            if (!board[currentPos.row + 1][currentPos.box] && !board[currentPos.row + 2][currentPos.box])
                possibleMoves = [{ row: currentPos.row + 1, box: currentPos.box }, { row: currentPos.row + 2, box: currentPos.box }]
            else if (!board[currentPos.row + 1][currentPos.box])
                possibleMoves = [{ row: currentPos.row + 1, box: currentPos.box }]


        } else {
            if (!board[currentPos.row + 1][currentPos.box])
                possibleMoves = [{ row: currentPos.row + 1, box: currentPos.box }]

        }
    }
    else
        if (currentPos.row === 6) {
            if (!board[currentPos.row - 1][currentPos.box] && !board[currentPos.row - 2][currentPos.box])
                possibleMoves = [{ row: currentPos.row - 1, box: currentPos.box }, { row: currentPos.row - 2, box: currentPos.box }]
            else if (!board[currentPos.row - 1][currentPos.box])
                possibleMoves = [{ row: currentPos.row - 1, box: currentPos.box }]

        } else {
            if (!board[currentPos.row - 1][currentPos.box])

                possibleMoves = [{ row: currentPos.row - 1, box: currentPos.box }]

        }
    return possibleMoves
}
const GamePage = () => {

    const [boardState, setBoardState] = React.useState(null)
    const [clickedBox, setClickedBox] = React.useState({})
    const [currentTeam, setCurrentTeam] = React.useState('white')
    const [pieceSuggestions, setPieceSuggestions] = React.useState([])

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
        setBoardState(_boardState)
    }, [])

    React.useEffect(() => {
        if (boardState) {
            if (clickedBox.row === undefined || clickedBox.box === undefined)
                return setPieceSuggestions([]);

            let possibleMoves = []
            switch (clickedBox.piece.piece) {
                case 'pawn': {
                    possibleMoves = getPawnMoves(boardState, clickedBox, currentTeam)
                    break;
                }
                case 'bishop': {
                    possibleMoves = getBishopMoves(boardState, clickedBox, currentTeam)
                    break;
                }
                case 'queen': {

                    possibleMoves = [...getBishopMoves(boardState, clickedBox, currentTeam), ...getRockMoves(boardState, clickedBox, currentTeam)]
                    break;
                }
                case 'rock': {
                    possibleMoves = getRockMoves(boardState, clickedBox, currentTeam)
                    break;
                }
                case 'knight': {
                    possibleMoves = getKnightMoves(boardState, clickedBox, currentTeam)

                    break;
                }
                case 'king': {
                    possibleMoves = getKingMoves(boardState, clickedBox, currentTeam)
                    break;
                }
                default:
                    break;
            }
            setPieceSuggestions([...possibleMoves])
        }
    }, [boardState, currentTeam, clickedBox])

    const getColorBoxClass = (rowIndex, boxIndex) => {

        if (rowIndex % 2 === 0) {
            if (boxIndex % 2 === 0)
                return classes.boxColorOne
            return classes.boxColorTwo
        } else {
            if (boxIndex % 2 === 0)
                return classes.boxColorTwo
            return classes.boxColorOne
        }

    }
    const clickedPieceHandler = (piece, row, box) => {
        if (!(boardState[row][box]) || boardState[row][box].team !== currentTeam) {
            if (isValidNextGame(row, box)) {

                const _boardState = [...boardState];
                _boardState[clickedBox.row][clickedBox.box] = null;
                _boardState[row][box] = clickedBox.piece
                setCurrentTeam((team) => {
                    if (team === 'white')
                        return 'black'
                    return 'white'
                })
                setBoardState([..._boardState])
            }
            setPieceSuggestions([])
            setClickedBox({})
        }
        else if (checkClickedPiece(row, box) || boardState[row][box].team !== currentTeam)
            setClickedBox({})
        else
            setClickedBox({ row, box, piece })

    }
    const checkClickedPiece = (row, box) => {
        return (clickedBox.row === row && clickedBox.box === box)
    }

    const isValidNextGame = (rowIndex, boxIndex) => {
        let result = false
        pieceSuggestions.forEach(suggestion => {
            if (suggestion.row === rowIndex && suggestion.box === boxIndex)
                result = true
        })
        return result
    }
    if (!boardState)
        return null
    return (
        <Container fluid className={classes.mainContainer}>
            <Row style={{ display: 'flex', height: '100%', alignItems: 'center' }}>
                <Col className={classes.boardContainer}>
                    <div>
                        {boardState.map((row, rowIndex) => (
                            <div key={rowIndex} className={classes.boardRow}>
                                {row.map((piece, boxIndex) => (
                                    <div key={boxIndex} onClick={() => clickedPieceHandler(piece, rowIndex, boxIndex)}

                                        style={{ border: checkClickedPiece(rowIndex, boxIndex) ? '3px solid black' : isValidNextGame(rowIndex, boxIndex) ? '3px solid yellow' : 'none' }}
                                        className={`${classes.boxContainer} ${getColorBoxClass(rowIndex, boxIndex)}`}>
                                        {piece && <div className={classes.pieceImg} style={{ backgroundImage: `url(${piece.img})` }} />}
                                    </div>
                                ))}

                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default GamePage
