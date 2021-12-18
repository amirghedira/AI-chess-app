import React from 'react'
import { BLACK_PAWN, WHITE_PAWN } from '../../utils/Pieces'
import classes from './LoadingPage.module.css'
const LoadingPage = () => {
    return (
        <div className={classes.mainContainer}>
            <div className={classes.pawnsContainer}>
                <img className={classes.pawnImage} alt="pawn" src={BLACK_PAWN.img} />
                <img className={`${classes.pawnImage} ${classes.whitePawnImage}`} alt="pawn" src={WHITE_PAWN.img} />
            </div>
        </div>
    )
}

export default LoadingPage
