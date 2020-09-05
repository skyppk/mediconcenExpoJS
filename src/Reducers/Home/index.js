import { HomeActionTypes } from './action'
const initialState = {
    loading: true,
    error_occured: false,
    data: null
}

export default (state = initialState, {type, payload}) => {
    switch (type){
        case HomeActionTypes.LOAD_DATA:
            return {...state, loading: true, error_occured: false};
        case HomeActionTypes.DATA_LOADED:
            return {...state, data: payload, loading: false};
        case HomeActionTypes.LOAD_DATA_FAILED:
            return {...state, loading: false, error_occured: true};
        default:
            return state
    }
}