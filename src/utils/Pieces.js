import whitePawnPieceImg from '../assets/pieces/white_pawn.png'
import blackPawnPieceImg from '../assets/pieces/black_pawn.png'
import blackRockPieceImg from '../assets/pieces/black_rock.png'
import whiteRockPieceImg from '../assets/pieces/white_rock.png'
import whiteKingPieceImg from '../assets/pieces/white_king.png'
import blackKingPieceImg from '../assets/pieces/black_king.png'
import blackbishopPieceImg from '../assets/pieces/black_bishop.png'
import whitebishopPieceImg from '../assets/pieces/white_bishop.png'
import whiteknightPieceImg from '../assets/pieces/white_knight.png'
import blackknightPieceImg from '../assets/pieces/black_knight.png'
import blackQueenPieceImg from '../assets/pieces/black_queen.png'
import whiteQueenPieceImg from '../assets/pieces/white_queen.png'

const WHITE_PAWN = { piece: 'pawn', team: 'white', value: '1', img: whitePawnPieceImg }
const WHITE_ROCK = { piece: 'rock', team: 'white', value: '5', img: whiteRockPieceImg }
const WHITE_QUEEN = { piece: 'queen', team: 'white', value: '9', img: whiteQueenPieceImg }
const WHITE_KNIGHT = { piece: 'knight', team: 'white', value: '3', img: whiteknightPieceImg }
const WHITE_KING = { piece: 'king', team: 'white', value: '0', img: whiteKingPieceImg }
const WHITE_BISHOP = { piece: 'bishop', team: 'white', value: '3', img: whitebishopPieceImg }

const BLACK_PAWN = { piece: 'pawn', team: 'black', value: '1', img: blackPawnPieceImg }
const BLACK_ROCK = { piece: 'rock', team: 'black', value: '5', img: blackRockPieceImg }
const BLACK_QUEEN = { piece: 'queen', team: 'black', value: '9', img: blackQueenPieceImg }
const BLACK_KNIGHT = { piece: 'knight', team: 'black', value: '3', img: blackknightPieceImg }
const BLACK_KING = { piece: 'king', team: 'black', value: '0', img: blackKingPieceImg }
const BLACK_BISHOP = { piece: 'bishop', team: 'black', value: '3', img: blackbishopPieceImg }


export {
    WHITE_BISHOP,
    WHITE_KING,
    WHITE_KNIGHT,
    WHITE_QUEEN,
    WHITE_ROCK, WHITE_PAWN,
    BLACK_BISHOP,
    BLACK_KING,
    BLACK_KNIGHT,
    BLACK_PAWN,
    BLACK_QUEEN,
    BLACK_ROCK
}