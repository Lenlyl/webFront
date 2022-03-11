import {createStore,combineReducers} from "redux";
import topics from "./reducers/topics";
export default createStore(combineReducers({
    topics
}));
