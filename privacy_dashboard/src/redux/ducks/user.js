import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        setUserIn(state, action){
            const new_data = action.payload;
            return {...state, ...new_data};
        },
        resetUser(state,action){
            console.log("RESETTING")
            return {};
        },
        getUser(state, action){},
        doLogin(state, action){},
        doLogout(state, action){},
        doLoginKeycloak(state,action){},
        updateToken(state,action){

            return {...state, ...action.payload}

        },
        setLoginState(state, action){
            return {...state, ...action.payload}
        }


    }
})

export const {getUser, setUserIn, doLogin, doLogout, resetUser, updateToken, doLoginKeycloak, setLoginState} = userSlice.actions;
export default userSlice.reducer;