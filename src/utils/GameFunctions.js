const isFreeBox = (box, team) => {

    if (!box)
        return "empty"

    if (box.team !== team)
        return "eat"
    return false
}

const getKingAsBishopMoves = (board, currentPos, team) => {

    let possibleMoves = []

    let i = currentPos.row + 1;
    let j = currentPos.box + 1;

    while (i <= 7 && j <= 7) {

        possibleMoves.push({ row: i, box: j })
        if (!board[i][j] || (board[i][j]?.piece === 'king' && board[i][j]?.team === team)) {
            i++;
            j++;
        } else {

            break;

        }



    }
    i = currentPos.row - 1;
    j = currentPos.box - 1;

    while (i >= 0 && j >= 0) {

        possibleMoves.push({ row: i, box: j })
        if (!board[i][j] || (board[i][j]?.piece === 'king' && board[i][j]?.team === team)) {
            i--;
            j--;
        } else {

            break;

        }
    }


    i = currentPos.row - 1;
    j = currentPos.box + 1;
    while (i >= 0 && j <= 7) {
        possibleMoves.push({ row: i, box: j })
        if (!board[i][j] || (board[i][j]?.piece === 'king' && board[i][j]?.team === team)) {
            i--;
            j++;
        } else {

            break;

        }


    }

    i = currentPos.row + 1;
    j = currentPos.box - 1;
    while (i <= 7 && j >= 0) {

        possibleMoves.push({ row: i, box: j })
        if (!board[i][j] || (board[i][j]?.piece === 'king' && board[i][j]?.team === team)) {
            i++;
            j--;
        } else {

            break;

        }


    }
    return possibleMoves

}

const getBishopTopLeftPath = (board, currentPos, team, isExtra, isKing) => {
    let i = currentPos.row + 1;
    let j = currentPos.box + 1;
    let possibleMoves = []
    while (i <= 7 && j <= 7 && (isFreeBox(board[i][j], team) || (isExtra && isFreeBox(board[i][j], team) === 'empty'))) {

        possibleMoves.push({ row: i, box: j })
        if (isFreeBox(board[i][j], team) === "eat") {
            break;
        }
        i++;
        j++;

    }
    return possibleMoves
}

const getBishopTopRightPath = (board, currentPos, team, isExtra, isKing) => {
    let possibleMoves = []
    let i = currentPos.row - 1;
    let j = currentPos.box - 1;
    while (i >= 0 && j >= 0 && (isFreeBox(board[i][j], team) || (isExtra && isFreeBox(board[i][j], team) === 'empty'))) {

        possibleMoves.push({ row: i, box: j })

        if (isFreeBox(board[i][j], team) === "eat") {
            break;
        }
        i--;
        j--;

    }

    return possibleMoves
}

const getBishopBottomLeftPath = (board, currentPos, team, isExtra, isKing) => {
    let possibleMoves = []
    let i = currentPos.row - 1;
    let j = currentPos.box + 1;
    while (i >= 0 && j <= 7 && (isFreeBox(board[i][j], team) || (isExtra && isFreeBox(board[i][j], team) === 'empty'))) {

        possibleMoves.push({ row: i, box: j })
        if (isFreeBox(board[i][j], team) === "eat") {
            break;
        }
        i--;
        j++;

    }
    return possibleMoves
}
const getBishopBottomRightPath = (board, currentPos, team, isExtra, isKing) => {

    let possibleMoves = []
    let i = currentPos.row + 1;
    let j = currentPos.box - 1;
    while (i <= 7 && j >= 0 && (isFreeBox(board[i][j], team) || (isExtra && isFreeBox(board[i][j], team) === 'empty'))) {

        possibleMoves.push({ row: i, box: j })
        if (isFreeBox(board[i][j], team) === "eat") {
            break;
        }
        i++;
        j--;


    }
    return possibleMoves
}

const getBishopMoves = (board, currentPos, team, isExtra, isKing) => {


    const possibleMoves = [...getBishopBottomLeftPath(board, currentPos, team, isExtra, isKing),
    ...getBishopBottomRightPath(board, currentPos, team, isExtra, isKing),
    ...getBishopTopLeftPath(board, currentPos, team, isExtra, isKing),
    ...getBishopTopRightPath(board, currentPos, team, isExtra, isKing)
    ]
    return possibleMoves
}

const getKingAsRockMoves = (board, currentPos, team) => {
    let possibleMoves = []
    let i = currentPos.row + 1;
    while (i <= 7) {
        possibleMoves.push({ row: i, box: currentPos.box })
        if (!board[i][currentPos.box] || (board[i][currentPos.box]?.piece === 'king' && board[i][currentPos.box]?.team === team)) {
            i++;

        } else {

            break;

        }
    }
    i = currentPos.row - 1;
    while (i >= 0) {
        possibleMoves.push({ row: i, box: currentPos.box })

        if (!board[i][currentPos.box] || (board[i][currentPos.box]?.piece === 'king' && board[i][currentPos.box]?.team === team)) {
            i--;

        } else {

            break;

        }

    }
    let j = currentPos.box - 1;
    while (j >= 0) {
        possibleMoves.push({ row: currentPos.row, box: j })
        if (!board[currentPos.row][j] || (board[currentPos.row][j]?.piece === 'king' && board[currentPos.row][j]?.team === team)) {
            j--;
        } else {

            break;

        }
    }
    j = currentPos.box + 1;
    while (j <= 7) {
        possibleMoves.push({ row: currentPos.row, box: j })

        if (!board[currentPos.row][j] || (board[currentPos.row][j]?.piece === 'king' && board[currentPos.row][j]?.team === team)) {

            j++;
        } else {

            break;

        }
    }
    return possibleMoves;

}
const getRockLeftMoves = (board, currentPos, team, isExtra, isKing) => {
    let possibleMoves = []
    let i = currentPos.row + 1;
    while (i <= 7 && (isFreeBox(board[i][currentPos.box], team) || isExtra)) {
        possibleMoves.push({ row: i, box: currentPos.box })
        if (isFreeBox(board[i][currentPos.box], team) === "eat" || (isExtra && isKing && !isFreeBox(board[i][currentPos.box], team))) {
            break;
        }
        i++
    }

    return possibleMoves;

}

const getRockTopMoves = (board, currentPos, team, isExtra, isKing) => {
    let possibleMoves = []

    let i = currentPos.row - 1;
    while (i >= 0 && (isFreeBox(board[i][currentPos.box], team) || isExtra)) {
        possibleMoves.push({ row: i, box: currentPos.box })
        if (isFreeBox(board[i][currentPos.box], team) === "eat" || (isExtra && isKing && !isFreeBox(board[i][currentPos.box], team))) {

            break;

        }
        i--
    }

    return possibleMoves;

}

const getRockBottomMoves = (board, currentPos, team, isExtra, isKing) => {
    let possibleMoves = []
    let j = currentPos.box - 1;
    while (j >= 0 && (isFreeBox(board[currentPos.row][j], team) || isExtra)) {
        possibleMoves.push({ row: currentPos.row, box: j })
        if (isFreeBox(board[currentPos.row][j], team) === "eat" || (isExtra && isKing && !isFreeBox(board[currentPos.row][j], team))) {

            break;

        }

        j--
    }

    return possibleMoves;

}
const getRockRightMoves = (board, currentPos, team, isExtra, isKing) => {
    let possibleMoves = []
    let j = currentPos.box + 1;
    while (j <= 7 && (isFreeBox(board[currentPos.row][j], team) || isExtra)) {

        possibleMoves.push({ row: currentPos.row, box: j })
        if (isFreeBox(board[currentPos.row][j], team) === "eat" || (isExtra && isKing && !isFreeBox(board[currentPos.row][j], team))) {

            break;

        }

        j++
    }

    return possibleMoves;

}

const getRockMoves = (board, currentPos, team, isExtra = false, isKing = false) => {


    return [...getRockBottomMoves(board, currentPos, team, isExtra, isKing),
    ...getRockTopMoves(board, currentPos, team, isExtra, isKing),
    ...getRockLeftMoves(board, currentPos, team, isExtra, isKing),
    ...getRockRightMoves(board, currentPos, team, isExtra, isKing)];
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


const getPawnEatingMoves = (board, currentPos, team, isExtra = false, lastMove) => {
    const nextPawnRow = team === 'black' ? currentPos.row + 1 : currentPos.row - 1
    if (nextPawnRow < 0 && nextPawnRow > 7)
        return []


    let possibleMoves = []
    if (isExtra) {
        if (currentPos.box - 1 >= 0) {
            possibleMoves = [...possibleMoves, { row: nextPawnRow, box: currentPos.box - 1 }]

        }
        if (currentPos.box + 1 >= 0) {
            possibleMoves = [...possibleMoves, { row: nextPawnRow, box: currentPos.box + 1 }]

        }
        return possibleMoves
    } else {
        if (currentPos.box - 1 >= 0 && isFreeBox(board[nextPawnRow][currentPos.box - 1], team) === "eat") {
            possibleMoves = [...possibleMoves, { row: nextPawnRow, box: currentPos.box - 1 }]

        }
        if (currentPos.box + 1 >= 0 && isFreeBox(board[nextPawnRow][currentPos.box + 1], team) === "eat") {
            possibleMoves = [...possibleMoves, { row: nextPawnRow, box: currentPos.box + 1 }]

        }
        const passedPawnMove = getPassedPawn(team, currentPos, lastMove)
        if (passedPawnMove) {
            possibleMoves = [...possibleMoves, passedPawnMove]
        }
        return possibleMoves

    }


}
const getPassedPawn = (team, currentPos, lastMove) => {
    if (lastMove && lastMove.piece === 'pawn' && currentPos.row === lastMove.to.row && Math.abs(lastMove.from.row - lastMove.to.row) === 2) {
        if (team === 'black')
            return { row: currentPos.row + 1, box: lastMove.to.box }

        else
            return { row: currentPos.row - 1, box: lastMove.to.box }
    } else
        return null
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


const getKingMoves = (board, currentPos, team, checkAllowedMoved = true) => {


    let possibleMoves = getKingPossibleMoves(board, currentPos, team)
    if (!checkAllowedMoved)
        return possibleMoves
    let kingAllowedMoves = []
    possibleMoves.forEach(possibleMove => {
        if (isCheckedKing(board, team, possibleMove).length === 0)
            kingAllowedMoves.push(possibleMove)
    })

    return kingAllowedMoves

}


const getPawnMoves = (board, currentPos, team, lastMove) => {
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
    possibleMoves = [...possibleMoves, ...getPawnEatingMoves(board, currentPos, team, false, lastMove)]
    return possibleMoves
}



const checkPiecePreventKingCheck = (board, team, selectedPosition, isKingChecked, lastMove) => {
    const selectedPiece = board[selectedPosition.row][selectedPosition.box]
    if (!selectedPiece)
        return false
    if (selectedPiece.piece === 'king')
        return true


    let pieceMoves = []
    switch (selectedPiece.piece) {

        case 'pawn':
            pieceMoves = [...getPawnEatingMoves(board, selectedPosition, team), ...getPawnMoves(board, selectedPosition, team, lastMove)]
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

const checkPieceMovePreventKingCheck = (board, team, clickedBox, selectedPosition, isKingChecked, lastMove) => {


    if (clickedBox.piece.piece === 'king')
        return true
    if (!clickedBox)
        return false

    let pieceMoves = []
    switch (clickedBox.piece.piece) {
        case 'pawn':
            pieceMoves = [...getPawnEatingMoves(board, clickedBox, team), ...getPawnMoves(board, clickedBox, team, lastMove)]
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
            const leftRockPath = getRockLeftMoves(board, piecePosition, oponentTeam)
            if (checkPathIncludesPosition(leftRockPath, kingPosition)) {
                piecePath = leftRockPath
                break;
            }
            const rightRockPath = getRockRightMoves(board, piecePosition, oponentTeam)
            if (checkPathIncludesPosition(rightRockPath, kingPosition)) {
                piecePath = rightRockPath
                break;
            }
            const topRockPath = getRockTopMoves(board, piecePosition, oponentTeam)
            if (checkPathIncludesPosition(topRockPath, kingPosition)) {
                piecePath = topRockPath
                break;
            }
            const bottomRockPath = getRockBottomMoves(board, piecePosition, oponentTeam)
            if (checkPathIncludesPosition(bottomRockPath, kingPosition)) {
                piecePath = bottomRockPath
                break;
            }

            break;


        }
        case 'bishop':
            {
                const bottomLeftBishopPath = getBishopBottomLeftPath(board, piecePosition, oponentTeam)
                if (checkPathIncludesPosition(bottomLeftBishopPath, kingPosition)) {
                    piecePath = bottomLeftBishopPath
                    break;
                }
                const bottomRightBishopPath = getBishopBottomRightPath(board, piecePosition, oponentTeam)
                if (checkPathIncludesPosition(bottomRightBishopPath, kingPosition)) {
                    piecePath = bottomRightBishopPath
                    break;
                }
                const topLeftBishopPath = getBishopTopLeftPath(board, piecePosition, oponentTeam)
                if (checkPathIncludesPosition(topLeftBishopPath, kingPosition)) {
                    piecePath = topLeftBishopPath
                    break;
                }
                const topRightBishopPath = getBishopTopRightPath(board, piecePosition, oponentTeam)
                if (checkPathIncludesPosition(topRightBishopPath, kingPosition)) {
                    piecePath = topRightBishopPath
                    break;
                }

                break;
            }

        case 'queen':
            {
                const leftRockPath = getRockLeftMoves(board, piecePosition, oponentTeam)
                if (checkPathIncludesPosition(leftRockPath, kingPosition)) {
                    piecePath = leftRockPath
                    break;
                }
                const rightRockPath = getRockRightMoves(board, piecePosition, oponentTeam)
                if (checkPathIncludesPosition(rightRockPath, kingPosition)) {
                    piecePath = rightRockPath
                    break;
                }
                const topRockPath = getRockTopMoves(board, piecePosition, oponentTeam)
                if (checkPathIncludesPosition(topRockPath, kingPosition)) {
                    piecePath = topRockPath
                    break;
                }
                const bottomRockPath = getRockBottomMoves(board, piecePosition, oponentTeam)
                if (checkPathIncludesPosition(bottomRockPath, kingPosition)) {
                    piecePath = bottomRockPath
                    break;
                }

                const bottomLeftBishopPath = getBishopBottomLeftPath(board, piecePosition, oponentTeam)
                if (checkPathIncludesPosition(bottomLeftBishopPath, kingPosition)) {
                    piecePath = bottomLeftBishopPath
                    break;
                }
                const bottomRightBishopPath = getBishopBottomRightPath(board, piecePosition, oponentTeam)
                if (checkPathIncludesPosition(bottomRightBishopPath, kingPosition)) {
                    piecePath = bottomRightBishopPath
                    break;
                }
                const topLeftBishopPath = getBishopTopLeftPath(board, piecePosition, oponentTeam)
                if (checkPathIncludesPosition(topLeftBishopPath, kingPosition)) {
                    piecePath = topLeftBishopPath
                    break;
                }
                const topRightBishopPath = getBishopTopRightPath(board, piecePosition, oponentTeam)
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


    const possibleKingMoves = getKingMoves(board, kingPosition, team, false)
    possibleKingMoves.forEach(pos => {
        if (board[pos.row][pos.box]?.piece === 'king' && board[pos.row][pos.box]?.team === oponentTeam) {
            piecesCheckingPosition.push({ ...board[pos.row][pos.box], ...pos })
        }
    })


    const possibleKnightMoves = getKnightMoves(board, kingPosition, team)
    possibleKnightMoves.forEach(pos => {
        if (board[pos.row][pos.box]?.piece === 'knight' && board[pos.row][pos.box]?.team === oponentTeam) {
            piecesCheckingPosition.push({ ...board[pos.row][pos.box], ...pos })
        }
    })
    const possibleRockMoves = getKingAsRockMoves(board, kingPosition, team)

    possibleRockMoves.forEach(pos => {
        if ((board[pos.row][pos.box]?.piece === 'rock' || board[pos.row][pos.box]?.piece === 'queen') && board[pos.row][pos.box]?.team === oponentTeam) {
            piecesCheckingPosition.push({ ...board[pos.row][pos.box], ...pos })
        }
    })
    const possibleBishopMoves = getKingAsBishopMoves(board, kingPosition, team)
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


export {
    isCheckedKing,
    getBishopMoves,
    getKnightMoves,
    getRockMoves,
    getKingMoves,
    getPawnMoves,
    checkPieceMovePreventKingCheck,
    checkPiecePreventKingCheck,
    getPassedPawn,
    isFreeBox

}