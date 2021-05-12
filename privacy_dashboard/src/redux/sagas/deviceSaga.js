import {all, takeLatest} from 'redux-saga/effects';
import {
    handleGetDevicesAndPolicies, handleRegisterNewDeviceAndPolicies, handleRemoveDevice, handleUpdateDeviceAndPolicies,
} from "./handlers/device";
import {
    getDevicesAndPolicies,
    registerNewDeviceAndPolicies,
    removeDevice,
    updateDeviceAndPolicies
} from "../ducks/device";


function* watchGetDevicesAndPolicies(){
    yield takeLatest(getDevicesAndPolicies.type, handleGetDevicesAndPolicies)

}


function* watchRegisterNewDeviceAndPolicies(){
    yield takeLatest(registerNewDeviceAndPolicies.type, handleRegisterNewDeviceAndPolicies)
}


function* watchUpdateDeviceAndPolicies(){
    yield takeLatest(updateDeviceAndPolicies.type, handleUpdateDeviceAndPolicies)

}

function* watchRemoveDevice(){

    yield takeLatest(removeDevice.type, handleRemoveDevice)

}

export function* watcherDeviceSaga(){
    yield all([
        watchGetDevicesAndPolicies(),
        watchRegisterNewDeviceAndPolicies(),
        watchUpdateDeviceAndPolicies(),
        watchRemoveDevice()
    ])
}