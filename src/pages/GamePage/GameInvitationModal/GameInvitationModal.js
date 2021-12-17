import React from 'react'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import classes from './GameInvitationModal.module.css'

function GameInvitationModal(props) {
    return (
        <Modal style={{ maxWidth: '400px' }} centered backdropClassName={classes.backdrop} isOpen={props.isOpen} toggle={() => props.toggle(false)}>
            <ModalHeader style={{ width: '100%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div>
                    <h1 className={classes.title}>Game invitation</h1>
                    <h5 className={classes.description}>{props.username} wants to challange you for game</h5>


                </div>
            </ModalHeader>
            <ModalBody style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100%', margin: '10px' }}>
                    <Button style={{ width: '100%' }} onClick={props.onAccept}>Accept</Button>
                </div>
                <div style={{ width: '100%', margin: '10px' }}>
                    <Button style={{ width: '100%' }} onClick={props.onReject}>Reject</Button>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default GameInvitationModal
