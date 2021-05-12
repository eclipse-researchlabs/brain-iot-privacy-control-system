import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Provider} from 'react-redux';
import store from './redux/configureStoreToolkit.js'
import UserService from "./services/UserService";
import HttpService from "./services/HttpService";

const theme = createMuiTheme({
    typography: {
        fontFamily: "Roboto"
    },
    palette: {
        primary: {
            main: "#2989a7",
        },


    }

})

// function setInterceptors() {
//
//     axios.interceptors.response.use(
//         response => response,
//         error => {
//
//             console.log("IM HERE with error")
//             console.log(error)
//             console.log(error.response)
//
//             if (error.response) {
//
//                 if (error.response.status !== 401) {
//                     console.log("OTHER ERROR ")
//
//                     return Promise.reject(error);
//                 }
//
//                 /*
//                  * When response code is 401, try to refresh the token.
//                  * Eject the interceptor so it doesn't loop in case
//                  * token refresh causes the 401 response
//                  */
//                 axios.interceptors.response.eject(this);
//
//                 console.log("I HAVE THIS USER")
//                 console.log(store.getState().user)
//
//
//                 if (store.getState().user.refresh_token) {
//
//
//                     console.log(error.response.config);
//                     console.log("UPDATING TOKEN")
//
//
//                     const config = createNewTokenConfig();
//                     return axios.post(config.url, config.params, config.headers).then(response => {
//
//                         console.log("GOT NEW ACCESS TOKEN")
//
//                         store.dispatch(updateToken(response.data));
//                         localStorage.setItem('user', JSON.stringify({...store.getState().user, ...response.data}))
//
//                         error.response.config.headers['Authorization'] = 'Bearer ' + response.data.access_token;
//                         return axios(error.response.config)
//
//                     }).catch(error => {
//
//                         console.log("NOT ABLE TO FETCH ACCESS TOKEN. REFRESHING...")
//                         store.dispatch(resetUser())
//                         localStorage.removeItem('user')
//                         history.push('/login')
//
//                         return Promise.reject(error);
//
//                     })
//                 } else
//                     return Promise.reject(error);
//
//             } else
//                 return Promise.reject(error);
//         }
//     );
//
//
// }
//
// function setInterceptorsKeycloak(){
//
//     axios.interceptors.request.use((config) => {
//         if (UserService.isLoggedIn()) {
//             const cb = () => {
//                 config.headers.Authorization = `Bearer ${UserService.getToken()}`;
//                 return Promise.resolve(config);
//             };
//             return UserService.updateToken(cb);
//         }
//     });
//
// }
//
// setInterceptorsKeycloak();


const renderApp = () => ReactDOM.render(
    <React.StrictMode>
        <CssBaseline/>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <App/>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root"));

try {
    UserService.initKeycloak(renderApp);
} catch (e) {
    renderApp();
}
HttpService.configure()



