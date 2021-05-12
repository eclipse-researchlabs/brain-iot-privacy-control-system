import {configureStore, combineReducers} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {watcherUserSaga} from "./sagas/userSaga";
import userSlice from "./ducks/user";
import {watcherDeviceSaga} from "./sagas/deviceSaga";
import deviceSlice from "./ducks/device";
import {watcherServiceSaga} from "./sagas/serviceSaga";
import serviceSlice from "./ducks/service";

const reducer = combineReducers({user: userSlice, device: deviceSlice, service: serviceSlice});

const sagaMiddleware = createSagaMiddleware();


const store = configureStore({reducer: reducer, middleware: [sagaMiddleware]});

sagaMiddleware.run(watcherUserSaga)
sagaMiddleware.run(watcherDeviceSaga)
sagaMiddleware.run(watcherServiceSaga)

export default store;