import { ADD_DATA, UPDATE_FUEL, SET_FUEL } from "./fuelTypes";

const initialState = {
    data: [],
    fuelData: [],
    userMaxAllowance: 0
}

const fuelReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FUEL:
            return {
                ...state,
                fuelData: action.payload.fuelData,
                userMaxAllowance: action.payload.userMaxAllowance
            }
        case UPDATE_FUEL:
            return {
                ...state,
                data: action.payload.finalData,
                userMaxAllowance: action.payload.finalBalance
            }
        case ADD_DATA:
            return {
                ...state,
                data: state.data.length > 0 ? [...state.data, action.payload.data] : [action.payload.data],
                userMaxAllowance: action.payload.finalBalance
            }
            break;
        default:
            return state;
    }
}
export default fuelReducer