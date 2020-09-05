import { combineReducers} from "redux";
import clinic from './Clinic';
import home from './Home'

const mainReducer = combineReducers({
    clinic,
    home
});

export default mainReducer