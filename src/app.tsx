import React, { useEffect } from 'react';
import { AppRouter } from "./Router/index";
import useHttp from 'Http/useHttp';
import { getStoredAuthToken } from "shared/utils/authToken"
import { Provider as MobxProvider } from "mobx-react"
import Loading from './components/loading';
import store from "./mobx/store"

import "./style/component.less"
import "./style/index.css"


const App = () => {
    const { Router, skipPath } = AppRouter()
    const { postData, data } = useHttp<{ code: number }>("/api/verifyToken", false)
    const { postData: postMe, data: dataMe } = useHttp<any>("/api/me", false)

    useEffect(() => {
        let token = getStoredAuthToken()
        if (token) {
            postData({
                token
            })
        } else {
            skipPath("/login")
        }
    }, [])

    useEffect(() => {
        let token = getStoredAuthToken()
        if (data && data?.code != 200) {
            skipPath("/login")
        } else {
            postMe({ token })
            skipPath(location.pathname)
        }

    }, [data])


    useEffect(() => {
        console.log(dataMe, "dataMe")
        store.userInfo.getUserInfo(dataMe)
    }, [dataMe])

    return (
        <MobxProvider {...store}>
            {Router}
            <Loading />
        </MobxProvider>
    )
}

export default App;