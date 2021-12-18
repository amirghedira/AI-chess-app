import React from 'react'
import GlobalContext from './GlobalContext'
import io from "socket.io-client";
import axios, { host } from '../utils/axios'
import LocalStorageService from '../utils/localStorageService';
import LoadingPage from '../components/LoadingPage/LoadingPage';
const AppContext = (props) => {
    const socket = React.useState(io(host))[0];
    const [user, setUser] = React.useState(null)
    const [oponent, setOponent] = React.useState(null)
    const [loadingUser, setLoadingUser] = React.useState(true)
    React.useEffect(() => {
        if (LocalStorageService.getAccessToken()) {
            axios.get("/user/connected-user")
                .then((res) => {
                    if (res.data.connectedUser) {
                        setUser(res.data.connectedUser);
                        console.log(res.data.connectedUser)
                        socket.open()
                        socket.emit("connectuser", LocalStorageService.getAccessToken())
                        setLoadingUser(false);

                    } else {
                        LocalStorageService.clearToken();
                        window.location.href = "/login";
                    }
                })
                .catch((err) => {
                    if (!err.response) {
                        setLoadingUser(false)
                    }
                });
        }
        else {
            LocalStorageService.clearToken();
            setLoadingUser(false)
        }
        // eslint-disable-next-line
    }, []);

    React.useEffect(() => {
        console.log(oponent)
    }, [oponent])
    return (
        <GlobalContext.Provider value={{
            user,
            setUser,
            oponent,
            setOponent,
            socket,
        }}>
            {!loadingUser ? props.children
                :
                <LoadingPage />}
        </GlobalContext.Provider>
    )
}

export default AppContext
