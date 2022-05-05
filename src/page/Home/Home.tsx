import React, { useEffect } from 'react';
import axios from 'axios';
import { Button } from "antd"
const Home = () => {

    useEffect(() => {
        axios.get("http://localhost:8080/goods/goodAll").then((res) => {
            console.log(res, "get")
        })
    }, [])
    return (
        <>
            <Button type={"link"}>测试</Button>
        </>
    )
}
export default Home