import { ADD, MINUS } from "../action-types"
import { Action } from "redux"


export interface IState {
    num: number
}
let initState: IState = {
    num: 0
}
export default function (state: IState = initState, action: Action): IState {
    switch (action.type) {
        case ADD:
            return { num: state.num + 1 }
        default:
            return state
    }
}