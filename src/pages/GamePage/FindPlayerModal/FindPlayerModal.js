import axios from '../../../utils/axios';
import React from 'react'
import { Input, Modal, ModalBody, ModalHeader } from 'reactstrap';
import classes from './FindPlayerModal.module.css'
import SearchedPlayer from './SearchedPlayer/SearchedPlayer';

const FindPlayerModal = (props) => {
    const [searchedUser, setSearchedUser] = React.useState('')
    const [users, setUsers] = React.useState([])

    React.useEffect(() => {
        setSearchedUser('')
        setUsers([])
    }, [props.isOpen])

    React.useEffect(() => {
        axios.get(`/user/search/${searchedUser}`)
            .then(res => {
                setUsers(res.data.users)
            })
    }, [searchedUser])
    return (
        <Modal style={{ maxWidth: '400px' }} centered backdropClassName={classes.backdrop}
            isOpen={props.isOpen} toggle={props.toggle}>
            <ModalHeader style={{ width: '100%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div>
                    <h1 className={classes.title}>Search a player</h1>
                    <h5 className={classes.description}>{props.username} search for player to Challenge</h5>


                </div>
            </ModalHeader>
            <ModalBody style={{ width: '100%' }}>
                <div style={{ marginBottom: '15px' }}>
                    <Input value={searchedUser} onChange={(e) => setSearchedUser(e.target.value)} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    {users.map(user => (
                        <SearchedPlayer
                            onClick={() => props.selectedPlayer(user)}
                            image={user.profileImage}
                            name={user.username}
                            score={user.score} />
                    ))}
                </div>

            </ModalBody>
        </Modal>
    )
}

export default FindPlayerModal
