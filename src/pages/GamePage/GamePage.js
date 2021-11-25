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

            let suggestionBoxes = []
            switch (clickedBox.piece.piece) {
                case 'pawn': {
                    if (currentTeam === 'black') {
                        if (clickedBox.row === 1) {
                            if (!boardState[clickedBox.row + 1][clickedBox.box] && !boardState[clickedBox.row + 2][clickedBox.box])
                                suggestionBoxes = [{ row: clickedBox.row + 1, box: clickedBox.box }, { row: clickedBox.row + 2, box: clickedBox.box }]
                            else if (!boardState[clickedBox.row + 1][clickedBox.box])
                                suggestionBoxes = [{ row: clickedBox.row + 1, box: clickedBox.box }]


                        } else {
                            if (!boardState[clickedBox.row + 1][clickedBox.box])
                                suggestionBoxes = [{ row: clickedBox.row + 1, box: clickedBox.box }]

                        }
                    }
                    else
                        if (clickedBox.row === 6) {
                            if (!boardState[clickedBox.row - 1][clickedBox.box] && !boardState[clickedBox.row - 2][clickedBox.box])
                                suggestionBoxes = [{ row: clickedBox.row - 1, box: clickedBox.box }, { row: clickedBox.row - 2, box: clickedBox.box }]
                            else if (!boardState[clickedBox.row - 1][clickedBox.box])
                                suggestionBoxes = [{ row: clickedBox.row - 1, box: clickedBox.box }]

                        } else {
                            if (!boardState[clickedBox.row - 1][clickedBox.box])

                                suggestionBoxes = [{ row: clickedBox.row - 1, box: clickedBox.box }]

                        }
                    break;
                }
                case 'bishop': {
                    let i = clickedBox.row + 1;
                    let j = clickedBox.box + 1;
                    while (i <= 7 && j <= 7 && !boardState[i][j]) {
                        suggestionBoxes.push({ row: i, box: j })
                        i++;
                        j++;

                    }
                    i = clickedBox.row - 1;
                    j = clickedBox.box - 1;
                    while (i >= 0 && j >= 0 && !boardState[i][j]) {

                        suggestionBoxes.push({ row: i, box: j })
                        i--;
                        j--;

                    }
                    i = clickedBox.row - 1;
                    j = clickedBox.box + 1;
                    while (i >= 0 && j <= 7 && !boardState[i][j]) {

                        suggestionBoxes.push({ row: i, box: j })
                        i--;
                        j++;

                    }
                    i = clickedBox.row + 1;
                    j = clickedBox.box - 1;
                    while (i <= 7 && j >= 0 && !boardState[i][j]) {

                        suggestionBoxes.push({ row: i, box: j })
                        i++;
                        j--;

                    }
                    break;
                }
                case 'queen': {

                    let i = clickedBox.row + 1;
                    let j = clickedBox.box + 1;
                    while (i <= 7 && j <= 7 && !boardState[i][j]) {
                        suggestionBoxes.push({ row: i, box: j })
                        i++;
                        j++;

                    }
                    i = clickedBox.row - 1;
                    j = clickedBox.box - 1;
                    while (i >= 0 && j >= 0 && !boardState[i][j]) {

                        suggestionBoxes.push({ row: i, box: j })
                        i--;
                        j--;

                    }
                    i = clickedBox.row - 1;
                    j = clickedBox.box + 1;
                    while (i >= 0 && j <= 7 && !boardState[i][j]) {

                        suggestionBoxes.push({ row: i, box: j })
                        i--;
                        j++;

                    }
                    i = clickedBox.row + 1;
                    j = clickedBox.box - 1;
                    while (i <= 7 && j >= 0 && !boardState[i][j]) {

                        suggestionBoxes.push({ row: i, box: j })
                        i++;
                        j--;

                    }
                    i = clickedBox.row + 1;

                    while (i < 8 && !boardState[i][clickedBox.box]) {
                        suggestionBoxes.push({ row: i, box: clickedBox.box })
                        i++
                    }
                    i = clickedBox.row - 1;
                    while (i >= 0 && !boardState[i][clickedBox.box]) {
                        suggestionBoxes.push({ row: i, box: clickedBox.box })

                        i--
                    }

                    j = clickedBox.box + 1;
                    while (j < 8 && !boardState[clickedBox.row][j]) {
                        suggestionBoxes.push({ row: clickedBox.row, box: j })

                        j++
                    }
                    j = clickedBox.box - 1;
                    while (j >= 0 && !boardState[clickedBox.row][j]) {
                        suggestionBoxes.push({ row: clickedBox.row, box: j })

                        j--
                    }
                    break;
                }
                case 'rock': {

                    let i = clickedBox.row + 1;

                    while (i < 8 && !boardState[i][clickedBox.box]) {
                        suggestionBoxes.push({ row: i, box: clickedBox.box })
                        i++
                    }
                    i = clickedBox.row - 1;
                    while (i >= 0 && !boardState[i][clickedBox.box]) {
                        suggestionBoxes.push({ row: i, box: clickedBox.box })

                        i--
                    }

                    let j = clickedBox.box + 1;
                    while (j < 8 && !boardState[clickedBox.row][j]) {
                        suggestionBoxes.push({ row: clickedBox.row, box: j })

                        j++
                    }
                    j = clickedBox.box - 1;
                    while (j >= 0 && !boardState[clickedBox.row][j]) {
                        suggestionBoxes.push({ row: clickedBox.row, box: j })

                        j--
                    }
                    break;
                }
                case 'knight': {
                    suggestionBoxes = []
                    if (clickedBox.box - 1 >= 0 && clickedBox.row + 2 <= 7 && !boardState[clickedBox.row + 2][clickedBox.box - 1])
                        suggestionBoxes.push({ row: clickedBox.row + 2, box: clickedBox.box - 1 })

                    if (clickedBox.box + 1 <= 7 && clickedBox.row + 2 <= 7 && !boardState[clickedBox.row + 2][clickedBox.box + 1])
                        suggestionBoxes.push({ row: clickedBox.row + 2, box: clickedBox.box + 1 })

                    if (clickedBox.box - 1 >= 0 && clickedBox.row - 2 >= 0 && !boardState[clickedBox.row - 2][clickedBox.box - 1])
                        suggestionBoxes.push({ row: clickedBox.row - 2, box: clickedBox.box - 1 })

                    if (clickedBox.box + 1 <= 7 && clickedBox.row - 2 >= 0 && !boardState[clickedBox.row - 2][clickedBox.box + 1])
                        suggestionBoxes.push({ row: clickedBox.row - 2, box: clickedBox.box + 1 })


                    if (clickedBox.box - 2 >= 0 && clickedBox.row + 1 <= 7 && !boardState[clickedBox.row + 1][clickedBox.box - 2])
                        suggestionBoxes.push({ row: clickedBox.row + 1, box: clickedBox.box - 2 })

                    if (clickedBox.box + 2 <= 7 && clickedBox.row + 1 <= 7 && !boardState[clickedBox.row + 1][clickedBox.box + 2])
                        suggestionBoxes.push({ row: clickedBox.row + 1, box: clickedBox.box + 2 })

                    if (clickedBox.box - 2 >= 0 && clickedBox.row - 1 >= 0 && !boardState[clickedBox.row - 1][clickedBox.box - 2])
                        suggestionBoxes.push({ row: clickedBox.row - 1, box: clickedBox.box - 2 })

                    if (clickedBox.box + 2 <= 7 && clickedBox.row - 1 >= 0 && !boardState[clickedBox.row - 1][clickedBox.box + 2])
                        suggestionBoxes.push({ row: clickedBox.row - 1, box: clickedBox.box + 2 })

                    break;
                }
                case 'king': {
                    if (!boardState[clickedBox.row][clickedBox.box - 1] && clickedBox.box - 1 >= 0)
                        suggestionBoxes.push({ row: clickedBox.row, box: clickedBox.box - 1 })
                    if (!boardState[clickedBox.row][clickedBox.box + 1] && clickedBox.box + 1 <= 7)
                        suggestionBoxes.push({ row: clickedBox.row, box: clickedBox.box + 1 })
                    let i = clickedBox.row - 1;

                    while (i >= 0 && i <= clickedBox.row + 1 && i <= 7) {
                        if (i === clickedBox.row) {
                            i++
                        } else {
                            if (!boardState[i][clickedBox.box - 1] && clickedBox.box - 1 >= 0)
                                suggestionBoxes.push({ row: i, box: clickedBox.box - 1 })
                            if (!boardState[i][clickedBox.box + 1] && clickedBox.box + 1 <= 7)
                                suggestionBoxes.push({ row: i, box: clickedBox.box + 1 })

                            if (!boardState[i][clickedBox.box])
                                suggestionBoxes.push({ row: i, box: clickedBox.box })
                            i++
                        }
                    }
                    i = clickedBox.row + 1;

                    while (i >= 0 && i >= clickedBox.row - 1 && i <= 7) {
                        if (i === clickedBox.row) {
                            i--
                        } else {
                            if (!boardState[i][clickedBox.box - 1] && clickedBox.box - 1 >= 0)
                                suggestionBoxes.push({ row: i, box: clickedBox.box - 1 })
                            if (!boardState[i][clickedBox.box + 1] && clickedBox.box + 1 <= 7)
                                suggestionBoxes.push({ row: i, box: clickedBox.box + 1 })
                            if (!boardState[i][clickedBox.box])
                                suggestionBoxes.push({ row: i, box: clickedBox.box })
                            i--
                        }
                    }
                    break;
                }
                default:
                    break;
            }
            setPieceSuggestions([...suggestionBoxes])
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
        if (!boardState[row][box]) {
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
