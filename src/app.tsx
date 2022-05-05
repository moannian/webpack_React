import React, { useEffect } from 'react';
import { Provider } from "react-redux"
import 'antd/dist/antd.css';
import store from "./store/index";
import "./mock/index"
import "./style/index"
import { AppRouter } from "./Router/index"
const App = () => {
    const { Router, skipPath } = AppRouter()
    useEffect(() => { skipPath("/home") }, [])
    return (

        <Provider store={store}>
            {Router}
        </Provider>
    )
}

export default App;