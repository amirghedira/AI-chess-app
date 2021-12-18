import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import classes from './LoadingGameModal.module.css'
import { BLACK_PAWN } from '../../../utils/Pieces'
const LoadingGameModal = (props) => {
    return (
        <Modal style={{ maxWidth: '400px' }} centered backdropClassName={classes.backdrop} isOpen={props.isOpen} toggle={() => props.toggle(false)}>
            <ModalHeader style={{ width: '100%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div>
                    <h1 className={classes.title}>Loading Game</h1>
                    <h5 className={classes.description}>{props.username}Waiting for the challenge to be accepted...</h5>
                </div>
            </ModalHeader>
            <ModalBody style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img alt="pawn" src={BLACK_PAWN.img} className={classes.imgPawn} />
                </div>

            </ModalBody>
        </Modal>
    )
}

export default LoadingGameModal
