import { useState, useEffect } from "react"
import request from "./index";

interface IState<D> {
    error: Error | null,
    data: D | null,
    state: "loading" | "error" | "success"
}

const defalueInitState: IState<null> = {
    error: null,
    data: null,
    state: "loading"
}
const useHttp = <D>(url: string, isFrist: Boolean = true) => {

    const [state, setState] = useState<IState<D>>({ ...defalueInitState });

    const setData = (data: D) => setState({
        data,
        error: null,
        state: "success"
    })

    const setError = (error: Error) => setState({
        data: null,
        error,
        state: "error"
    })

    useEffect(() => {
        if (isFrist) {
            getData({})
        }
    }, [])

    const getData = (params: any = {}) => {
        request({
            url,
            method: "get",
            params
        }).then(res => {
            setData(res as any)
        }).catch(err => {
            setError(err)
        }
        )
    }

    const postData = (data?: any) => {
        request({
            url,
            method: "post",
            data
        }).then(res => {
            setData(res as any)
        }).catch(err => {
            setError(err)
        }
        )
    }



    return {
        isSuccess: state.state === "success",
        data: state.data,
        postData,
        getData
    }
}

export default useHttp


