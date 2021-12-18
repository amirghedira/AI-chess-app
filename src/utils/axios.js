import axios from 'axios'
import localStorageService from './localStorageService'
const production = true;

const host = production ? 'https://chessnodeapi.herokuapp.com' : 'http://localhost:5000'

const axiosInstance = axios.create({ baseURL: host })
axiosInstance.interceptors.request.use(
    config => {
        const accessToken = localStorageService.getAccessToken();
        if (accessToken) {
            config.headers['Authorization'] = 'Bearer ' + accessToken;
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });
axiosInstance.interceptors.response.use((response) => {
    return response
},
    function (error) {
        const originalRequest = error.config;
        if (error.response) {
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                return axios.post(`${host}/user/token`, {
                    accessToken: localStorageService.getAccessToken()
                })
                    .then(res => {
                        if (res.status === 200) {
                            // 1) put token to LocalStorage
                            localStorageService.setAccessToken(res.data.accessToken);
                            // 2) Change Authorization header
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
                            originalRequest.headers['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
                            // 3) return originalRequest object with Axios.
                            return axios(originalRequest);
                        }
                    })
                    .catch(err => {
                        localStorageService.clearToken()
                        window.location.href = "/login"
                    })
            } else if (error.response.status === 403) {
                localStorageService.clearToken()
                window.location.href = "/login"
            }
            else return Promise.reject(error)

        }
        else return Promise.reject(error)
    });

export { host };
export default axiosInstance