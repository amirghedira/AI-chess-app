import React from 'react'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import classes from './EndGameModal.module.css'

function EndGameModal(props) {
    return (
        <Modal style={{ maxWidth: '400px' }} centered backdropClassName={classes.backdrop} isOpen={props.isOpen} toggle={() => props.toggle(false)}>
            <ModalHeader style={{ width: '100%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div>
                    <h1 className={classes.title}>{props.title}</h1>
                    <h5 className={classes.description}>{props.description}</h5>
                    <h1 className={classes.scoreText}>899(+7)</h1>


                </div>
            </ModalHeader>
            <ModalBody style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100%', margin: '10px' }}>
                    <Button style={{ width: '100%' }}>Rematch</Button>
                </div>
                <div style={{ width: '100%', margin: '10px' }}>
                    <Button style={{ width: '100%' }}>New 5min</Button>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default EndGameModal
