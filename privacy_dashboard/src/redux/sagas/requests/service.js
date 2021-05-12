import {
    BACKEND_ENDPOINT,
} from "../../../utils/config";
import HttpService from "../../../services/HttpService";


export function requestGetServicesAndPolicies(){

    const url = BACKEND_ENDPOINT + "/api/v1/brain_consumers/service";
    return HttpService.getAxiosClient().get(url);


}


export function requestRegisterNewServicesAndPolicies(name, resource_scopes){

    const url = BACKEND_ENDPOINT + "/api/v1/brain_consumers/service";
    const params =
        {
            "name": name,
            "resource_scopes": resource_scopes
        }

    return HttpService.getAxiosClient().post(url, params)
}

export function requestUpdateServiceAndPolicies(name, resource_scopes){

    const url = BACKEND_ENDPOINT + "/api/v1/brain_consumers/service";
    const params =
        {
            "name": name,
            "resource_scopes": resource_scopes
        }

    return HttpService.getAxiosClient().put(url, params)


}

export function requestRemoveService(service_id){

    console.log("DELETING " , service_id)
    const url = BACKEND_ENDPOINT + "/api/v1/brain_consumers/service/" + service_id;


    return HttpService.getAxiosClient().delete(url)
}