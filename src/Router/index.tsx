import React from 'react'
import { Routes, Route, useNavigate, NavigateOptions } from "react-router-dom";
import Count from "../components/conunt"
import Home from "../components/Home"
import Error404 from "../components/Error404"
export const AppRouter = () => {
    const navigate = useNavigate();
    const skipPath = (to: string, state?: NavigateOptions) => {
        navigate(to, state)
    }
    const Router = (<>

        <Routes>
            <Route path='/' element={<Count />}></Route>
            <Route path='/home' element={<Home />}></Route>
            <Route path='*' element={<Error404 />}></Route>
        </Routes>

    </>)
    return { skipPath, Router }
}
