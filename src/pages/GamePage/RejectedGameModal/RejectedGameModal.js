import React from 'react'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import classes from './RejectedGameModal.module.css'

const RejectedGameModal = (props) => {
    return (
        <Modal style={{ maxWidth: '400px' }} centered backdropClassName={classes.backdrop} isOpen={props.isOpen} toggle={() => props.toggle(false)}>
            <ModalHeader style={{ width: '100%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div>
                    <h1 className={classes.title}>Challenge canceled</h1>
                    <h5 className={classes.description}>{props.message}</h5>


                </div>
            </ModalHeader>
            <ModalBody style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {!props.noRematch && <div style={{ width: '100%', margin: '10px' }}>
                    <Button style={{ width: '100%' }} onClick={props.onRematch}>Rematch</Button>
                </div>}
                <div style={{ width: '100%', margin: '10px' }}>
                    <Button style={{ width: '100%' }} onClick={props.onNewGame}>New 5min</Button>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default RejectedGameModal
