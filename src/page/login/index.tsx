import React, { useState } from "react";
import "./login.less";
import VerifyLogin from "./verifyLogin"
import PasswordLogin from "./passwordLogin";


const Login = () => {
    const [loginMethod, setLoginMethod] = useState("password")


    const LoginMethood = () => {
        switch (loginMethod) {
            case "password":
                return <PasswordLogin change={() => {
                    setLoginMethod("verifyCode")
                }} />
            case "verifyCode":
                return <VerifyLogin change={() => { setLoginMethod("password") }} />
        }
    }
    return (
        <div className="login">
            <div className="content">
                <div className="left">
                    <div className="logo">
                        <img src="https://cdn.pingcode.com/static/pc-charm/assets/images/logo.png?v=4.1.2" alt="" />
                    </div>
                    <div className="image">
                        <img src="https://cdn.pingcode.com/static/pc-charm/assets/images/pingcode-intro-02.png?v=4.1.2" alt="" />
                    </div>
                </div>
                <div className="right">
                    {LoginMethood()}
                </div>

            </div>
        </div>
    )
}

export default Login