import React from 'react'
import { Container, Row, Col, Input, Button } from 'reactstrap'
import classes from './Signup.module.css'
import axios from '../../utils/axios'
const Signup = (props) => {
    const [newUser, setNewUser] = React.useState({})
    const signupHandler = () => {
        axios.post('/user', { ...newUser })
            .then(res => {
                window.location.href = '/login'
            })
    }
    return (
        <Container fluid className={classes.mainContainer}>
            <Row className={classes.mainRow}>
                <Col xs="3" className={classes.loginContainer}>
                    <div className={classes.inputGroupContainer}>
                        <h5 className={classes.inputLabel}>
                            Username
                        </h5>
                        <Input className={classes.inputLogin} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
                    </div>
                    <div className={classes.inputGroupContainer}>
                        <h5 className={classes.inputLabel}>
                            Password
                        </h5>
                        <Input className={classes.inputLogin} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
                    </div>
                    <div className={classes.inputGroupContainer}>
                        <h5 className={classes.inputLabel}>
                            Confirm password
                        </h5>
                        <Input className={classes.inputLogin} onChange={(e) => setNewUser({ ...newUser, repassword: e.target.value })} />
                    </div>
                    <div className={classes.inputGroupContainer}>
                        <div className={classes.buttonContainer}>
                            <Button color='info' onClick={signupHandler} className={classes.loginButton}>Sign up</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Signup
