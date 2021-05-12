import history from "../../../history";
import UserService from "../../../services/UserService";
import {REDIRECT_URI} from "../../../utils/config";


export function handleLogout(action){

    try {
        UserService.doLogout({
            redirectUri: REDIRECT_URI
        })
        history.push("/login")

    }catch (error) {
        console.log(error);


    }
}




export function handleLoginKeycloak(action){

    console.log("HANDLING LOGIN KEYCLOAK")

    try {
        if (!UserService.isLoggedIn())
            UserService.doLogin({
                redirectUri: REDIRECT_URI
            })

    }catch (error) {
        console.log(error);


    }



}