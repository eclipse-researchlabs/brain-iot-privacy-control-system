import {all, takeLatest} from 'redux-saga/effects';
import {
    handleGetServicesAndPolicies,
    handleRegisterNewServicesAndPolicies, handleRemoveService,
    handleUpdateServiceAndPolicies
} from "./handlers/service";
import {
    getServicesAndPolicies,
    registerNewServiceAndPolicies,
    removeService,
    updateServiceAndPolicies
} from "../ducks/service";


function* watchGetServices(){
    yield takeLatest(getServicesAndPolicies.type, handleGetServicesAndPolicies)

}


function* watchRegisterNewService(){
    yield takeLatest(registerNewServiceAndPolicies.type, handleRegisterNewServicesAndPolicies)
}

function* watchUpdateService(){

    yield takeLatest(updateServiceAndPolicies.type, handleUpdateServiceAndPolicies)

}

function* watchRemoveService(){
    yield takeLatest(removeService.type, handleRemoveService)
}


export function* watcherServiceSaga(){
    yield all([
        watchGetServices(),
        watchRegisterNewService(),
        watchUpdateService(),
        watchRemoveService()
    ])
}