import React from "react";
import { connect } from 'react-redux'
import { Dispatch } from "redux"
import { IReducers } from "../store/reducers/content";
import { IState } from "../store/reducers/index"
import { ADD } from "../store/action-types"

let mapStateToProps = (state: IReducers): IState => state.Count;
let mapDispatchToProps = (dispatch: Dispatch) => ({
    add(vaule: number) {
        dispatch({ type: ADD, vaule })
    }
})

type TProps = ReturnType<typeof mapStateToProps>
type TProps2 = ReturnType<typeof mapDispatchToProps>


let Count: React.FC<TProps & TProps2> = React.memo((props) => {
    return (
        <>
            <div>{props.num}</div>
            <button onClick={() => props.add(1)}>add</button>
        </>

    )
})



export default connect(mapStateToProps, mapDispatchToProps)(Count)