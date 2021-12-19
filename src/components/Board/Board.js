import React from 'react'
import { isFreeBox } from '../../utils/GameFunctions'
import classes from './Board.module.css'

const Board = (props) => {


    const getTransformBoard = () => {
        if (props.isFlippedBoard)
            return 'rotate(180deg)'
        return 'none'

    }
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
    const getBoxBackgroundColor = (rowIndex, boxIndex) => {
        if (props.checkCheckedKing(rowIndex, boxIndex))
            return '#ad0000'
        if (props.checkClickedPiece(rowIndex, boxIndex))
            return '#B1833E'
        if (checkIsLastMove(rowIndex, boxIndex))
            return '#b38b51'

        return getColorBox(rowIndex, boxIndex)
    }
    const checkIsLastMove = (row, box) => {
        if (!props.lastMove)
            return false
        return (props.lastMove.from.row === row && props.lastMove.from.box === box) || (props.lastMove.to.row === row && props.lastMove.to.box === box)
    }
    return (
        <div className={classes.mainBoardContainer} style={{ transform: getTransformBoard() }}>
            {props.board.map((row, rowIndex) => (
                <div key={rowIndex} className={classes.boardRow}>
                    {row.map((box, boxIndex) => (
                        <div key={boxIndex} onClick={() => props.clickedPiece(rowIndex, boxIndex)}

                            style={{ transform: getTransformBoard(), backgroundColor: getBoxBackgroundColor(rowIndex, boxIndex) }}
                            className={classes.boxContainer} >
                            {props.activeBox && props.isValidNextGame(rowIndex, boxIndex) && <React.Fragment>
                                {isFreeBox(box, props.currentTeam) === "eat" ? <div className={classes.eatMoveBox}></div>
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
    )
}

export default Board
