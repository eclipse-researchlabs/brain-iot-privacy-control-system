import React from 'react';
import {
    Redirect, Route,
} from "react-router-dom";
import UserService from "../../services/UserService";


function LoginRoute(props) {


    return !UserService.isLoggedIn() ? <Route {...props}/> : <Redirect to='/home'/>;

}

export default LoginRoute;

