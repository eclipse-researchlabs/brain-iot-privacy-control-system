import {createSlice} from "@reduxjs/toolkit";

const deviceSlice = createSlice({
    name: 'device',
    initialState: {
        available_policy: undefined,
        device_policy_list: undefined,
        loading: false,
        error: false,
        statusText: ""
        },
    reducers: {
        setDevicesAndPoliciesState(state,action){        //Stores locally state about devices
            const result = action.payload;
            return {...state, ...result}
        },
        addNewDeviceAndPoliciesState(state, action){

            let temp = state.device_policy_list.slice()
            temp.push(action.payload)
            return {...state, device_policy_list: temp}

        },
        modifyDeviceAndPoliciesState(state,action){

            const {device_id, policy_list, storage_policy} = action.payload;

            let temp = state.device_policy_list.filter((element)=>element.device_id !== device_id)

            if (storage_policy)
                temp.push({device_id: device_id, policy_list: policy_list, storage_policy: storage_policy})
            else
                temp.push({device_id: device_id, policy_list: policy_list})

            return {...state, device_policy_list: temp}

        },
        removeDeviceState(state, action){


            const {device_id} = action.payload;
            let temp = state.device_policy_list.filter((element)=>element.device_id !== device_id)

            return {...state, device_policy_list: temp}

        },
        setStatus(state, action){                       //Stores status about operations
            return {...state, ...action.payload}
        },
        getDevicesAndPolicies(state,action){},          //Fetches all devices from server
        registerNewDeviceAndPolicies(state,action){},   //Create a new device and related policies
        updateDeviceAndPolicies(state,action){},        //Update an existing device
        removeDevice(state,action){}                    //Delete a device
    },
})

export const {setDevicesAndPoliciesState, addNewDeviceAndPoliciesState, modifyDeviceAndPoliciesState, removeDeviceState, setStatus, getDevicesAndPolicies, registerNewDeviceAndPolicies, updateDeviceAndPolicies, removeDevice} = deviceSlice.actions;
export default deviceSlice.reducer;