import {
    BACKEND_ENDPOINT,
} from "../../../utils/config";
import HttpService from "../../../services/HttpService";


export function requestGetDevicesAndPolicies(){

    const url = BACKEND_ENDPOINT + "/api/v1/brain_user/policy";
    return HttpService.getAxiosClient().get(url);


}

export function requestRegisterNewDeviceAndPolicies(device_id, policy_list){

    const url = BACKEND_ENDPOINT + "/api/v1/brain_user/policy";
    let params = {
        device_id: device_id,
        policy_list: policy_list,
    }

    console.log(params)
    return HttpService.getAxiosClient().post(url, params)
}


export function requestUpdateDeviceAndPolicies(device_id, policy_list, storage_policy){

    const url = BACKEND_ENDPOINT + "/api/v1/brain_user/policy";
    let params = storage_policy ? {
        device_id: device_id,
        policy_list: policy_list,
        storage_policy: storage_policy
    } : {
        device_id: device_id,
        policy_list: policy_list,
    };

    console.log(params)

    return HttpService.getAxiosClient().put(url, params)

}


export function requestRemoveDevice(device_id){

    const url = BACKEND_ENDPOINT + "/api/v1/brain_user/policy/"+ device_id;
    return HttpService.getAxiosClient().delete(url)

}


