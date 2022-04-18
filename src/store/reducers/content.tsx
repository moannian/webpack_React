import { combineReducers, ReducersMapObject, AnyAction, Reducer } from "redux";
import Count, { IState } from "./index";

import { connectRouter, RouterState } from "connected-react-router";
import history from "../../history"
export interface IReducers {
    Count: IState,
    router: RouterState
}
const reducers: ReducersMapObject<IReducers, AnyAction> = {
    Count,
    router: connectRouter(history)
}
export type CombinedState = {
    [k in keyof typeof reducers]: ReturnType<typeof reducers[k]>
}
let reducer: Reducer<CombinedState, AnyAction> = combineReducers(reducers)

export default reducer