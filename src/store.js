import {createStore,applyMiddleware,compose,combineReducers} from "redux";
import thunk from "redux-thunk";
import {productReducer} from "./reducers/productReducers"
const initialState={};
const composeEnheancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(combineReducers({
    products:productReducer,
    }),
    initialState,
    composeEnheancer(applyMiddleware(thunk))

)
export default store;
