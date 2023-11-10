import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/AuthReducers";
import suppliesReducer from "./reducers/SuppliesReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  supplies: suppliesReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
