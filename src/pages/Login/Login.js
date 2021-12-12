import React from 'react'
import { Container, Row, Col, Input, Button } from 'reactstrap'
import classes from './Login.module.css'
const Login = (props) => {
    return (
        <Container fluid className={classes.mainContainer}>
            <Row className={classes.mainRow}>
                <Col xs="3" className={classes.loginContainer}>
                    <div className={classes.inputGroupContainer}>
                        <h5 className={classes.inputLabel}>
                            Username
                        </h5>
                        <Input className={classes.inputLogin} />
                    </div>
                    <div className={classes.inputGroupContainer}>
                        <h5 className={classes.inputLabel}>
                            Password
                        </h5>
                        <Input className={classes.inputLogin} />
                    </div>
                    <div className={classes.inputGroupContainer}>
                        <div className={classes.buttonContainer}>
                            <Button color='info' className={classes.loginButton}>Login</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
