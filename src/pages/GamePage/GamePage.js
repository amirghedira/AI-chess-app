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

const getBishopTopLeftPath = (board, currentPos, team) => {
    let i = currentPos.row + 1;
    let j = currentPos.box + 1;
    let possibleMoves = []
    while (i <= 7 && j <= 7 && isFreeBox(board[i][j], team)) {

        possibleMoves.push({ row: i, box: j })
        if (isFreeBox(board[i][j], team) === "eat") {
            break;
        }
        i++;
        j++;

    }
    return possibleMoves
}

const getBishopTopRightPath = (board, currentPos, team) => {
    let possibleMoves = []
    let i = currentPos.row - 1;
    let j = currentPos.box - 1;
    while (i >= 0 && j >= 0 && (isFreeBox(board[i][j], team))) {

        possibleMoves.push({ row: i, box: j })


        if (isFreeBox(board[i][j], team) === "eat") {
            break;
        }
        i--;
        j--;

    }
    return possibleMoves
}

const getBishopBottomLeftPath = (board, currentPos, team) => {
    let possibleMoves = []
    let i = currentPos.row - 1;
    let j = currentPos.box + 1;
    while (i >= 0 && j <= 7 && (isFreeBox(board[i][j], team))) {

        possibleMoves.push({ row: i, box: j })

        if (isFreeBox(board[i][j], team) === "eat") {
            break;
        }
        i--;
        j++;

    }
    return possibleMoves
}
const getBishopBottomRightPath = (board, currentPos, team) => {

    let possibleMoves = []
    let i = currentPos.row + 1;
    let j = currentPos.box - 1;
    while (i <= 7 && j >= 0 && (isFreeBox(board[i][j], team))) {

        possibleMoves.push({ row: i, box: j })
        if (isFreeBox(board[i][j], team) === "eat") {
            break;
        }
        i++;
        j--;


    }

    return possibleMoves
}

const getBishopMoves = (board, currentPos, team) => {


    const possibleMoves = [...getBishopBottomLeftPath(board, currentPos, team),
    ...getBishopBottomRightPath(board, currentPos, team),
    ...getBishopTopLeftPath(board, currentPos, team),
    ...getBishopTopRightPath(board, currentPos, team)
    ]
    return possibleMoves
}

const getRockTopMoves = (board, currentPos, team) => {
    let possibleMoves = []

    let i = currentPos.row - 1;
    while (i >= 0 && (isFreeBox(board[i][currentPos.box], team))) {
        possibleMoves.push({ row: i, box: currentPos.box })
        if (isFreeBox(board[i][currentPos.box], team) === "eat") {
            break;

        }
        i--
    }

    return possibleMoves;

}

const getRockLeftMoves = (board, currentPos, team) => {
    let possibleMoves = []
    let i = currentPos.row + 1;
    while (i < 8 && (isFreeBox(board[i][currentPos.box], team))) {
        possibleMoves.push({ row: i, box: currentPos.box })
        if (isFreeBox(board[i][currentPos.box], team) === "eat") {
            break;
        }
        i++
    }

    return possibleMoves;

}
const getRockRightMoves = (board, currentPos, team) => {
    let possibleMoves = []
    let j = currentPos.box + 1;
    while (j < 8 && (isFreeBox(board[currentPos.row][j], team))) {

        possibleMoves.push({ row: currentPos.row, box: j })
        if (isFreeBox(board[currentPos.row][j], team) === "eat") {
            break;

        }

        j++
    }

    return possibleMoves;

}
const getRockBottomMoves = (board, currentPos, team) => {
    let possibleMoves = []
    let j = currentPos.box - 1;
    while (j >= 0 && (isFreeBox(board[currentPos.row][j], team))) {
        possibleMoves.push({ row: currentPos.row, box: j })
        if (isFreeBox(board[currentPos.row][j], team) === "eat") {
            break;

        }

        j--
    }

    return possibleMoves;

}

const getRockMoves = (board, currentPos, team) => {


    return [...getRockBottomMoves(board, currentPos, team),
    ...getRockTopMoves(board, currentPos, team),
    ...getRockLeftMoves(board, currentPos, team),
    ...getRockRightMoves(board, currentPos, team)];
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


const getPawnEatingMoves = (board, currentPos, team, isExtra = false) => {
    const nextPawnRow = team === 'black' ? currentPos.row + 1 : currentPos.row - 1
    if (nextPawnRow < 0 && nextPawnRow > 7)
        return []


    let possibleMoves = []
    if (isExtra) {
        if (currentPos.box - 1 >= 0) {
            possibleMoves = [...possibleMoves, { row: nextPawnRow, box: currentPos.box - 1 }]

        }
        if (currentPos.box - 1 >= 0) {
            possibleMoves = [...possibleMoves, { row: nextPawnRow, box: currentPos.box + 1 }]

        }
        return possibleMoves
    } else {
        if (currentPos.box - 1 >= 0 && isFreeBox(board[nextPawnRow][currentPos.box - 1], team) === "eat") {
            possibleMoves = [...possibleMoves, { row: nextPawnRow, box: currentPos.box - 1 }]

        }
        if (currentPos.box - 1 >= 0 && isFreeBox(board[nextPawnRow][currentPos.box + 1], team) === "eat") {
            possibleMoves = [...possibleMoves, { row: nextPawnRow, box: currentPos.box + 1 }]

        }
        return possibleMoves

    }

}
const getKingPossibleMoves = (board, currentPos, team) => {
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
    return possibleMoves
}


const getKingMoves = (board, currentPos, team) => {


    let possibleMoves = getKingPossibleMoves(board, currentPos, team)
    let kingAllowedMoves = []
    possibleMoves.forEach(possibleMove => {
        if (isCheckedKing(board, team, possibleMove).length === 0)
            kingAllowedMoves.push(possibleMove)
    })

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
    else {
        if (currentPos.row === 6) {
            if (!board[currentPos.row - 1][currentPos.box] && !board[currentPos.row - 2][currentPos.box])
                possibleMoves = [{ row: currentPos.row - 1, box: currentPos.box }, { row: currentPos.row - 2, box: currentPos.box }]
            else if (!board[currentPos.row - 1][currentPos.box])
                possibleMoves = [{ row: currentPos.row - 1, box: currentPos.box }]

        } else {
            if (!board[currentPos.row - 1][currentPos.box])

                possibleMoves = [{ row: currentPos.row - 1, box: currentPos.box }]

        }
    }
    possibleMoves = [...possibleMoves, ...getPawnEatingMoves(board, currentPos, team, false)]
    return possibleMoves
}



const checkPiecePreventKingCheck = (board, team, selectedPosition, isKingChecked) => {
    const selectedPiece = board[selectedPosition.row][selectedPosition.box]
    if (!selectedPiece)
        return false
    if (selectedPiece.piece === 'king')
        return true


    let pieceMoves = []
    switch (selectedPiece.piece) {

        case 'pawn':
            pieceMoves = [...getPawnEatingMoves(board, selectedPosition, team), ...getPawnMoves(board, selectedPosition, team)]
            break;
        case 'queen':
            pieceMoves = [...getBishopMoves(board, selectedPosition, team), ...getRockMoves(board, selectedPosition, team)]
            break;
        case 'bishop':
            pieceMoves = [...getBishopMoves(board, selectedPosition, team)]
            break;
        case 'rock':
            pieceMoves = [...getRockMoves(board, selectedPosition, team)]
            break;
        case 'knight':
            pieceMoves = [...getKnightMoves(board, selectedPosition, team)]
            break;
        default:
            break;
    }

    if (pieceMoves.length === 0)
        return false

    let canEatPiece = false


    if (isKingChecked.checkByPositions.length === 1) {
        let i = 0
        while (!canEatPiece && i < pieceMoves.length) {
            if (pieceMoves[i].row === isKingChecked.checkByPositions[0].row && pieceMoves[i].box === isKingChecked.checkByPositions[0].box) {
                canEatPiece = true
            }
            i++
        }
    }

    let k = 0;
    let canMovePiece = true
    while (canMovePiece && k < isKingChecked.checkByPositions.length) {
        const piecePath = getPieceCheckKingPath(board, team, { row: isKingChecked.row, box: isKingChecked.box }, isKingChecked.checkByPositions[k].piece, isKingChecked.checkByPositions[k])
        let i = 0
        let canMovePieceElem = false
        while (!canMovePieceElem && i < pieceMoves.length) {
            if (checkPathIncludesPosition(piecePath, pieceMoves[i])) {
                canMovePieceElem = true
            }
            i++
        }
        if (!canMovePieceElem) {
            canMovePiece = false
        }
        k++
    }

    return canEatPiece || canMovePiece


}

const checkPieceMovePreventKingCheck = (board, team, clickedBox, selectedPosition, isKingChecked) => {


    if (clickedBox.piece.piece === 'king')
        return true
    if (!clickedBox)
        return false

    let pieceMoves = []
    switch (clickedBox.piece.piece) {
        case 'pawn':
            pieceMoves = [...getPawnEatingMoves(board, clickedBox, team), ...getPawnMoves(board, clickedBox, team)]
            break;
        case 'queen':
            pieceMoves = [...getBishopMoves(board, clickedBox, team), ...getRockMoves(board, clickedBox)]
            break;
        case 'bishop':
            pieceMoves = [...getBishopMoves(board, clickedBox, team)]
            break;
        case 'rock':
            pieceMoves = [...getRockMoves(board, clickedBox, team)]
            break;
        case 'knight':
            pieceMoves = [...getKnightMoves(board, clickedBox, team)]
            break;
        default:
            break;
    }

    if (pieceMoves.length === 0)
        return false

    let canEatPiece = false


    if (isKingChecked.checkByPositions.length === 1) {
        let i = 0

        while (!canEatPiece && i < pieceMoves.length) {
            if ((pieceMoves[i].row === isKingChecked.checkByPositions[0].row && pieceMoves[i].box === isKingChecked.checkByPositions[0].box)
                && (selectedPosition.row === isKingChecked.checkByPositions[0].row && selectedPosition.box === isKingChecked.checkByPositions[0].box)) {
                canEatPiece = true
            }
            i++
        }
    }
    let k = 0;
    let canMovePiece = true
    while (canMovePiece && k < isKingChecked.checkByPositions.length) {
        const piecePath = getPieceCheckKingPath(board, team, { row: isKingChecked.row, box: isKingChecked.box }, isKingChecked.checkByPositions[k].piece, isKingChecked.checkByPositions[k])
        if (!checkPathIncludesPosition(piecePath, selectedPosition)) {
            canMovePiece = false
        }

        k++
    }
    return canEatPiece || canMovePiece


}


const checkPathIncludesPosition = (pathPositions, position) => {
    return pathPositions.findIndex(pathPosition => pathPosition.row === position.row && pathPosition.box === position.box) >= 0
}
const getPieceCheckKingPath = (board, team, kingPosition, piece, piecePosition) => {
    const oponentTeam = team === 'white' ? 'black' : 'white'
    let piecePath = []
    switch (piece) {
        case 'rock': {
            const leftRockPath = getRockLeftMoves(board, piecePosition, oponentTeam, true)
            if (checkPathIncludesPosition(leftRockPath, kingPosition)) {
                piecePath = leftRockPath
                break;
            }
            const rightRockPath = getRockRightMoves(board, piecePosition, oponentTeam, true)
            if (checkPathIncludesPosition(rightRockPath, kingPosition)) {
                piecePath = rightRockPath
                break;
            }
            const topRockPath = getRockTopMoves(board, piecePosition, oponentTeam, true)
            if (checkPathIncludesPosition(topRockPath, kingPosition)) {
                piecePath = topRockPath
                break;
            }
            const bottomRockPath = getRockBottomMoves(board, piecePosition, oponentTeam, true)
            if (checkPathIncludesPosition(bottomRockPath, kingPosition)) {
                piecePath = bottomRockPath
                break;
            }

            break;


        }
        case 'bishop':
            {
                const bottomLeftBishopPath = getBishopBottomLeftPath(board, piecePosition, oponentTeam, true)
                if (checkPathIncludesPosition(bottomLeftBishopPath, kingPosition)) {
                    piecePath = bottomLeftBishopPath
                    break;
                }
                const bottomRightBishopPath = getBishopBottomRightPath(board, piecePosition, oponentTeam, true)
                if (checkPathIncludesPosition(bottomRightBishopPath, kingPosition)) {
                    piecePath = bottomRightBishopPath
                    break;
                }
                const topLeftBishopPath = getBishopTopLeftPath(board, piecePosition, oponentTeam, true)
                if (checkPathIncludesPosition(topLeftBishopPath, kingPosition)) {
                    piecePath = topLeftBishopPath
                    break;
                }
                const topRightBishopPath = getBishopTopRightPath(board, piecePosition, oponentTeam, true)
                if (checkPathIncludesPosition(topRightBishopPath, kingPosition)) {
                    piecePath = topRightBishopPath
                    break;
                }

                break;
            }

        case 'queen':
            {
                const leftRockPath = getRockLeftMoves(board, piecePosition, oponentTeam, true)
                if (checkPathIncludesPosition(leftRockPath, kingPosition)) {
                    piecePath = leftRockPath
                    break;
                }
                const rightRockPath = getRockRightMoves(board, piecePosition, oponentTeam, true)
                if (checkPathIncludesPosition(rightRockPath, kingPosition)) {
                    piecePath = rightRockPath
                    break;
                }
                const topRockPath = getRockTopMoves(board, piecePosition, oponentTeam, true)
                if (checkPathIncludesPosition(topRockPath, kingPosition)) {
                    piecePath = topRockPath
                    break;
                }
                const bottomRockPath = getRockBottomMoves(board, piecePosition, oponentTeam, true)
                if (checkPathIncludesPosition(bottomRockPath, kingPosition)) {
                    piecePath = bottomRockPath
                    break;
                }

                const bottomLeftBishopPath = getBishopBottomLeftPath(board, piecePosition, oponentTeam, true)
                if (checkPathIncludesPosition(bottomLeftBishopPath, kingPosition)) {
                    piecePath = bottomLeftBishopPath
                    break;
                }
                const bottomRightBishopPath = getBishopBottomRightPath(board, piecePosition, oponentTeam, true)
                if (checkPathIncludesPosition(bottomRightBishopPath, kingPosition)) {
                    piecePath = bottomRightBishopPath
                    break;
                }
                const topLeftBishopPath = getBishopTopLeftPath(board, piecePosition, oponentTeam, true)
                if (checkPathIncludesPosition(topLeftBishopPath, kingPosition)) {
                    piecePath = topLeftBishopPath
                    break;
                }
                const topRightBishopPath = getBishopTopRightPath(board, piecePosition, oponentTeam, true)
                if (checkPathIncludesPosition(topRightBishopPath, kingPosition)) {
                    piecePath = topRightBishopPath
                    break;
                }

                break;
            }

        default:
            break;
    }

    return piecePath
}

const isCheckedKing = (board, team, kingPosition) => {
    const oponentTeam = team === 'white' ? 'black' : 'white'

    const piecesCheckingPosition = []
    const possibleKnightMoves = getKnightMoves(board, kingPosition, team)
    possibleKnightMoves.forEach(pos => {
        if (board[pos.row][pos.box]?.piece === 'knight' && board[pos.row][pos.box]?.team === oponentTeam) {
            piecesCheckingPosition.push({ ...board[pos.row][pos.box], ...pos })
        }
    })
    const possibleRockMoves = getRockMoves(board, kingPosition, team)
    possibleRockMoves.forEach(pos => {
        if ((board[pos.row][pos.box]?.piece === 'rock' || board[pos.row][pos.box]?.piece === 'queen') && board[pos.row][pos.box]?.team === oponentTeam) {
            piecesCheckingPosition.push({ ...board[pos.row][pos.box], ...pos })
        }
    })
    const possibleBishopMoves = getBishopMoves(board, kingPosition, team)
    possibleBishopMoves.forEach(pos => {
        if ((board[pos.row][pos.box]?.piece === 'bishop' || board[pos.row][pos.box]?.piece === 'queen') && board[pos.row][pos.box]?.team === oponentTeam) {
            piecesCheckingPosition.push({ ...board[pos.row][pos.box], ...pos })
        }
    })

    let oponentPieces = []
    board.forEach((rowBoard, rowIndex) => {
        rowBoard.forEach((boxPiece, boxIndex) => {
            if (boxPiece && boxPiece.team === oponentTeam && boxPiece.piece === 'pawn')
                oponentPieces.push({ row: rowIndex, box: boxIndex, piece: boxPiece.piece })
        })
    })
    let oponentPawnEatingMoves = []
    oponentPieces.forEach(oponentPiece => {
        oponentPawnEatingMoves = [...oponentPawnEatingMoves, ...getPawnEatingMoves(board, { row: oponentPiece.row, box: oponentPiece.box }, oponentTeam, true)]
    })

    oponentPawnEatingMoves.forEach(oponentPawnEatingMove => {
        if (oponentPawnEatingMove.row === kingPosition.row && oponentPawnEatingMove.box === kingPosition.box)
            piecesCheckingPosition.push({ ...board[oponentPawnEatingMove.row][oponentPawnEatingMove.box], ...oponentPawnEatingMove })
    })

    return piecesCheckingPosition
}

const GamePage = () => {

    const [boardState, setBoardState] = React.useState(null)
    const [clickedBox, setClickedBox] = React.useState(null)
    const [currentTeam, setCurrentTeam] = React.useState('white')
    const [pieceSuggestions, setPieceSuggestions] = React.useState([])
    const [isKingChecked, setIsKingChecked] = React.useState(null)
    const [lastMove, setLastMove] = React.useState(null)
    const [allowedWhiteCastling, setAllowedWhiteCastling] = React.useState({ kingSide: true, queenSide: true })
    const [allowedBlackCastling, setAllowedBlackCastling] = React.useState({ kingSide: true, queenSide: true })

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
        setIsKingChecked(null)
        setLastMove(null)
        setCurrentTeam('white')
        setClickedBox(null)
    }, [])

    React.useEffect(() => {
        if (boardState) {
            if (!clickedBox)
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
                    if (currentTeam === 'black') {
                        if (allowedBlackCastling.kingSide && !boardState[0][5] && !boardState[0][6]) {
                            possibleMoves = [...possibleMoves, { row: 0, box: 6 }]
                        }
                        if (allowedBlackCastling.queenSide && !boardState[0][1] && !boardState[0][2] && !boardState[0][3]) {
                            possibleMoves = [...possibleMoves, { row: 0, box: 2 }]
                        }

                    } else {
                        if (allowedWhiteCastling.kingSide && !boardState[7][5] && !boardState[7][6]) {
                            possibleMoves = [...possibleMoves, { row: 7, box: 6 }]
                        }
                        if (allowedWhiteCastling.queenSide && !boardState[7][1] && !boardState[7][2] && !boardState[7][3]) {
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
                    return checkPieceMovePreventKingCheck(boardState, currentTeam, clickedBox, possibleMove, isKingChecked)
                })
            }
            setPieceSuggestions([...possibleMoves])
        }
    }, [boardState, currentTeam, clickedBox, isKingChecked])

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


    }, [boardState, currentTeam])

    React.useEffect(() => {
        if (isKingChecked) {
            const currentPos = { row: isKingChecked.row, box: isKingChecked.box }
            if (getKingMoves(boardState, currentPos, currentTeam).length === 0) {
                console.log(`${currentTeam} has lost`)
            }
        }
    }, [isKingChecked])

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
        if (isKingChecked && isKingChecked.team === currentTeam) {
            if (!clickedBox) {
                if (boardState[row][box]) {
                    if (!checkPiecePreventKingCheck(boardState, currentTeam, { row, box }, isKingChecked))
                        return setClickedBox(null)

                }
            } else {
                if (!checkPieceMovePreventKingCheck(boardState, currentTeam, clickedBox, { row, box }, isKingChecked))
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
                setLastMove({ from: { ...clickedBox }, to: { row, box }, piece: clickedBox.piece })
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
                            return setBoardState([..._boardState])

                        } else if (row === 0 && box === 6 && allowedBlackCastling.kingSide) {
                            _boardState[row][box] = clickedBox.piece
                            _boardState[row][5] = _boardState[row][7]
                            _boardState[row][7] = null
                            return setBoardState([..._boardState])
                        }

                    } else {
                        if (row === 7 && box === 2 && allowedWhiteCastling.queenSide) {
                            _boardState[row][box] = clickedBox.piece
                            _boardState[row][3] = _boardState[row][0]
                            _boardState[row][0] = null

                            return setBoardState([..._boardState])
                        } else if (row === 7 && box === 6 && allowedWhiteCastling.kingSide) {

                            _boardState[row][box] = clickedBox.piece
                            _boardState[row][5] = _boardState[row][7]
                            _boardState[row][7] = null
                            return setBoardState([..._boardState])
                        }
                    }
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


    const isValidNextGame = (rowIndex, boxIndex) => {
        let result = false
        pieceSuggestions.forEach(suggestion => {
            if (suggestion.row === rowIndex && suggestion.box === boxIndex)
                result = true
        })

        if (clickedBox) {

            if (clickedBox.piece.piece === 'king')
                return result
            let kingPosition
            const boardCopy = JSON.parse(JSON.stringify(boardState))
            boardState.forEach((row, rowIndex) => {
                row.forEach((box, boxIndex) => {
                    if (box && box.piece === 'king' && box.team === currentTeam) {
                        kingPosition = { row: rowIndex, box: boxIndex }
                    }
                })
            })
            if (kingPosition) {
                boardCopy[clickedBox.row][clickedBox.box] = null;
                boardCopy[rowIndex][boxIndex] = clickedBox.piece
                if (isCheckedKing(boardCopy, currentTeam, kingPosition).length > 0)
                    return false

            }
        }

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
                                {row.map((box, boxIndex) => (
                                    <div key={boxIndex} onClick={() => clickedPieceHandler(rowIndex, boxIndex)}

                                        style={{ backgroundColor: checkCheckedKing(rowIndex, boxIndex) ? '#ad0000' : checkClickedPiece(rowIndex, boxIndex) ? '#B1833E' : `${getColorBox(rowIndex, boxIndex)}` }}
                                        className={classes.boxContainer}>
                                        {isValidNextGame(rowIndex, boxIndex) && isFreeBox(box, currentTeam) === "eat" ? <div className={classes.eatMoveBox}></div>
                                            :
                                            isValidNextGame(rowIndex, boxIndex) && <div className={classes.possibleMoveBox}></div>

                                        }
                                        {box && <div className={classes.pieceImg} style={{ backgroundImage: `url(${box.img})` }} />}

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
