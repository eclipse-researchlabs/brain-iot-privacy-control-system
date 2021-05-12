import {call, put} from "redux-saga/effects";
import {requestGetDevicesAndPolicies,
    requestRegisterNewDeviceAndPolicies, requestRemoveDevice,
    requestUpdateDeviceAndPolicies
} from "../requests/device";
import {
    addNewDeviceAndPoliciesState, modifyDeviceAndPoliciesState,
    removeDeviceState,
    setDevicesAndPoliciesState,
    setStatus
} from "../../ducks/device";

export function* handleGetDevicesAndPolicies(action){


    try {

        yield put(setStatus({loading:true}))

        const response = yield call(requestGetDevicesAndPolicies);
        const {data} = response;
        console.log(data)

        yield put(setDevicesAndPoliciesState(data))
        yield put(setStatus({loading:false, error: false}))


    }catch (error) {
        console.log(error);

        if (error && error.response){
            yield put(setStatus({loading:false, error: true, statusText: error.message + " - Reason: " + error.response.data.detail }))
        }
        else
            yield put(setStatus({loading:false, error: true, statusText: "An error has occurred!"}))



    }

}


export function* handleRegisterNewDeviceAndPolicies(action){


    const {device_id, policy_list} = action.payload;


    try {

        yield put(setStatus({loading:true}))

        let response = yield call(requestRegisterNewDeviceAndPolicies, device_id, policy_list);

        console.log(response)
        yield put(addNewDeviceAndPoliciesState({device_id: device_id, policy_list: policy_list}))
        yield put(setStatus({loading:false, error: false, statusText: "Action performed correctly!"}))

    }catch (error) {
        console.log(error);
        if (error && error.response){
            yield put(setStatus({loading:false, error: true, statusText: error.message + " - Reason: " + error.response.data.detail }))
        }
        else
            yield put(setStatus({loading:false, error: true, statusText: "An error has occurred!"}))


    }

}


export function* handleUpdateDeviceAndPolicies(action){

    const {device_id, policy_list, storage_policy} = action.payload;

    console.log(action.payload)

    try {

        yield put(setStatus({loading:true}))

        yield call(requestUpdateDeviceAndPolicies, device_id, policy_list, storage_policy);

        yield put(modifyDeviceAndPoliciesState({device_id: device_id, policy_list: policy_list, storage_policy: storage_policy}))
        yield put(setStatus({loading:false, error: false, statusText: "Action performed correctly!"}))

    }catch (error) {
        console.log(error);
        if (error && error.response){
            yield put(setStatus({loading:false, error: true, statusText: error.message + " - Reason: " + error.response.data.detail }))
        }
        else
            yield put(setStatus({loading:false, error: true, statusText: "An error has occurred!"}))


    }

}

export function* handleRemoveDevice(action){

    const {device_id} = action.payload;


    try {

        yield put(setStatus({loading:true}))

        yield call(requestRemoveDevice, device_id);

        yield put(removeDeviceState({device_id: device_id}))
        yield put(setStatus({loading:false, error: false, statusText: "Action performed correctly!"}))

    }catch (error) {
        console.log(error);
        if (error && error.response){
            yield put(setStatus({loading:false, error: true, statusText: error.message + " - Reason: " + error.response.data.detail }))
        }
        else
            yield put(setStatus({loading:false, error: true, statusText: "An error has occurred!"}))


    }


}