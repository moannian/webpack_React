import React, { useEffect } from 'react';
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom";
import store from "./store/index"
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