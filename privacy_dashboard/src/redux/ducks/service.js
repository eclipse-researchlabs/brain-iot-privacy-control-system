import {createSlice} from "@reduxjs/toolkit";

const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        available_policy: [],
        service_policy_list: [],
        name: "",
        loading: false,
        error: false,
        statusText: ""
    },
    reducers: {
        setServicesAndPoliciesState(state, action) {

            const result = action.payload;
            return {...state, ...result}
        },
        addServiceAndPoliciesState(state, action) {

            const {name, resource_scopes} = action.payload

            let temp = state.service_policy_list.slice()
            temp.push({name: name, resource_scopes: resource_scopes})


            return {...state, service_policy_list: temp}

        },
        modifyServiceAndPoliciesState(state, action) {

            const {name, resource_scopes} = action.payload;

            let temp = state.service_policy_list.filter((element) => element.name !== name)


            temp.push({name: name, resource_scopes: resource_scopes})

            return {...state, service_policy_list: temp}
        },
        removeServiceState(state, action) {

            const {name} = action.payload;
            let temp = state.service_policy_list.filter((element) => element.name !== name)

            return {...state, service_policy_list: temp}
        },
        setStatus(state, action) {
            return {...state, ...action.payload}
        },
        getServicesAndPolicies(state, action) {
        },
        registerNewServiceAndPolicies(state, action) {
        },
        updateServiceAndPolicies(state, action) {
        },
        removeService(state, action) {
        },

    },
})

export const {
    setServicesAndPoliciesState,
    addServiceAndPoliciesState,
    modifyServiceAndPoliciesState,
    removeServiceState,
    setStatus,
    getServicesAndPolicies,
    registerNewServiceAndPolicies,
    updateServiceAndPolicies,
    removeService
} = serviceSlice.actions;
export default serviceSlice.reducer;