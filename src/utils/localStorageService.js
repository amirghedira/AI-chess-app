const LocalStorageService = (function () {

    const _setToken = (accessToken) => {
        localStorage.setItem("access_token", accessToken);
    }

    const _getAccessToken = () => {
        return localStorage.getItem("access_token");
    }

    const _clearToken = () => {
        localStorage.removeItem("access_token");
    }

    const _setAccessToken = (accessToken) => {
        localStorage.setItem("access_token", accessToken);
    }
    const _setLanguage = (language) => {
        localStorage.setItem('language', language)
    }
    const _setMode = (mode) => {
        localStorage.setItem('mode', mode)

    }
    const _getMode = () => {
        return localStorage.getItem('mode')
    }
    const _getLanguage = () => {
        return localStorage.getItem('language')
    }

    return {
        setToken: _setToken,
        setAccessToken: _setAccessToken,
        getAccessToken: _getAccessToken,
        clearToken: _clearToken,
        setMode: _setMode,
        setLanguage: _setLanguage,
        getMode: _getMode,
        getLanguage: _getLanguage
    };
})();
export default LocalStorageService;