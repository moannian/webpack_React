import React from 'react'
import { Routes, Route, useNavigate, NavigateOptions } from "react-router-dom";
import Regitster from "../page/register";
import Error404 from "../components/Error404";
import Login from '../page/login';
import Layout from '../components/layout/layout';
import WorkTable from '../page/work/index';
import ProductManagement from "page/productManagement"
export const AppRouter = () => {
    const navigate = useNavigate();
    const skipPath = (to: string, state?: NavigateOptions) => {
        navigate(to, state)
    }
    const Router = (<>

        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='/test' element={<h1>我是测试</h1>} />
                <Route path='/productManagement' element={<ProductManagement />}></Route>
            </Route>

            <Route path='/register' element={<Regitster />}></Route>
            <Route path='/login' element={<Login></Login>} />
            <Route path='*' element={<Error404 />}></Route>
        </Routes>

    </>)
    return { skipPath, Router }
}
