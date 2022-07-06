import { createStore } from "redux";
import fuelReducer from "./fuelReducer";
const store = createStore(fuelReducer)
export default store;