import { ADD_DATA, UPDATE_FUEL, SET_FUEL } from "./fuelTypes"

export const addData = (data) => ({
    type: ADD_DATA,
    payload: data
})
export const updateFuelData = (data) => ({
    type: UPDATE_FUEL,
    payload: data
})
export const setFuelData = (data) => ({
    type: SET_FUEL,
    payload: data
})