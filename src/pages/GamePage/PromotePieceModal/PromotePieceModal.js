import React from 'react'
import { Modal, ModalBody } from 'reactstrap';
import classes from './PromotePieceModal.module.css'
import {
    WHITE_BIPHOP,
    WHITE_KNIGHT,
    WHITE_QUEEN,
    WHITE_ROCK,
    BLACK_BIPHOP,
    BLACK_KNIGHT,
    BLACK_QUEEN,
    BLACK_ROCK
} from '../../../utils/Pieces'

const WHITE_PROMOTE_PIECES = [WHITE_ROCK, WHITE_QUEEN, WHITE_KNIGHT, WHITE_BIPHOP]
const BLACK_PROMOTE_PIECES = [BLACK_ROCK, BLACK_QUEEN, BLACK_KNIGHT, BLACK_BIPHOP]

function PromotePieceModal(props) {
    return (
        <Modal style={{ maxWidth: '400px' }} centered backdropClassName={classes.backdrop} isOpen={props.isOpen}
            toggle={props.toggle}>
            <ModalBody style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {props.team === 'white' ?
                    <div>
                        {WHITE_PROMOTE_PIECES.map((piece, index) => (
                            <img src={piece.img} key={index} alt={piece.piece} onClick={() => props.choosePromotedPiece(piece)} />
                        ))}
                    </div>
                    :
                    <div>
                        {BLACK_PROMOTE_PIECES.map((piece, index) => (
                            <img src={piece.img} key={index} alt={piece.piece} onClick={() => props.choosePromotedPiece(piece)} />
                        ))}
                    </div>
                }
            </ModalBody>
        </Modal>
    )
}

export default PromotePieceModal
