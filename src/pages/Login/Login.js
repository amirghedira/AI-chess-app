import React from 'react'
import { Container, Row, Col, Input, Button } from 'reactstrap'
import classes from './Login.module.css'
import axios from '../../utils/axios'
import LocalStorageService from '../../utils/localStorageService'
import GlobalContext from '../../context/GlobalContext'
import { useNavigate } from 'react-router-dom'
const Login = (props) => {
    const [loginInfo, setLoginInfo] = React.useState({})
    const context = React.useContext(GlobalContext)
    const [loading, setLoading] = React.useState(true)
    const navigate = useNavigate()
    React.useEffect(() => {
        if (context.user)
            navigate('/game')
        else
            setLoading(false)

        // eslint-disable-next-line
    }, [])
    const loginHandler = () => {
        console.log(loginInfo)
        axios.post('/user/login', { ...loginInfo })
            .then(res => {
                LocalStorageService.setAccessToken(res.data.accessToken)
                window.location.href = '/game'
            })
    }
    if (loading)
        return null
    return (
        <Container fluid className={classes.mainContainer}>
            <Row className={classes.mainRow}>
                <Col xs="3" className={classes.loginContainer}>
                    <div className={classes.inputGroupContainer}>
                        <h5 className={classes.inputLabel} >
                            Username
                        </h5>
                        <Input className={classes.inputLogin}
                            value={loginInfo.username}
                            onChange={(e) => { setLoginInfo({ ...loginInfo, username: e.target.value }) }}
                        />
                    </div>
                    <div className={classes.inputGroupContainer}>
                        <h5 className={classes.inputLabel}>
                            Password
                        </h5>
                        <Input className={classes.inputLogin}
                            value={loginInfo.password}
                            type='password'
                            onChange={(e) => { setLoginInfo({ ...loginInfo, password: e.target.value }) }}
                        />
                    </div>
                    <div className={classes.inputGroupContainer}>
                        <div className={classes.buttonContainer}>
                            <Button color='info' className={classes.loginButton}
                                onClick={loginHandler}>Login</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
