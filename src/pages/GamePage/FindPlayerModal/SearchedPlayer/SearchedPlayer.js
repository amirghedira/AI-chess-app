import React from 'react'
import classes from './SearchedPlayer.module.css'
const SearchedPlayer = (props) => {
    return (
        <div className={classes.mainContainer} onClick={props.onClick}>
            <div >
                <img alt="player" className={classes.playerImage} src={props.image} />
            </div>
            <div style={{ marginLeft: '10px' }}>
                <h5 className={classes.userNameText}>
                    {props.name}
                </h5>
                <h5 className={classes.scoreText}>
                    {props.score}
                </h5>
            </div>

        </div>
    )
}

export default SearchedPlayer
