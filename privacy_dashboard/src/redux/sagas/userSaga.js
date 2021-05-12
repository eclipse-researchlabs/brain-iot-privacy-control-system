import {all, takeLatest} from 'redux-saga/effects';
import {doLoginKeycloak, doLogout} from "../ducks/user";
import {handleLoginKeycloak, handleLogout} from "./handlers/user";




function* watchLogoutUser(){
    yield takeLatest(doLogout.type, handleLogout)

}

function* watchLoginUserKeycloak(){
    yield takeLatest(doLoginKeycloak.type, handleLoginKeycloak)
}


export function* watcherUserSaga(){
    yield all([
        watchLoginUserKeycloak(),
        watchLogoutUser()
    ])
}