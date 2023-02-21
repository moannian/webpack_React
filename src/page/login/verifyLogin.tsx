import React, { useState, useEffect } from "react";
import { Button, Form, ColProps, Input, message } from "antd";
import { EmailInput } from "../../components/Input/index";
import { AppRouter } from "../../Router/index";
import ILogin from "apiBackType/login";
import useHttp from 'Http/useHttp';
import { storeAuthToken } from "shared/utils/authToken"

import "./login.less";

const labelCol: ColProps = {
    span: 10,
    offset: 1,
}

interface IProps {
    change: () => void
}

const PasswordLogin: React.FC<IProps> = (props) => {
    const { skipPath } = AppRouter()
    const [emailContent, setEmailContent] = useState("");
    const [email, setEmail] = useState("")

    const { postData: sendVerify } = useHttp<any>("/api/verifyCode", false);
    const { postData, data } = useHttp<ILogin>("/api/login", false)

    //发送验证码
    const sendVerifyCode = () => {
        sendVerify({ email, type: "login" })
    }

    useEffect(() => {
        if (data?.code == 200) {
            message.success("登录成功");
            storeAuthToken(data.data.token);
            skipPath("/")
        }
    }, [data]);

    const finish = async (event: any) => {
        try {
            await postData({
                type: "verifyCode",
                ...event
            })
        } catch (error) {

        }
    }

    return (
        <>
            <p className="title">登录</p>
            <p className="hint">通过邮箱验证码，或者切换为
                <a href="#!" onClick={() => { props.change() }}>账号密码登录</a>
            </p>
            <div className="form">
                <Form layout="vertical"
                    labelCol={labelCol}
                    labelAlign="left"
                    onFinish={finish}
                >
                    <Form.Item label="邮箱号" name={"email"}>
                        <EmailInput
                            className='input'
                            emailContent={emailContent}
                            onChange={(e) => {
                                let valueList = e.target.value.split(".");
                                setEmail(e.target.value)
                                if (!(valueList.length >= 2)) {
                                    setEmailContent(e.target.value)
                                }
                            }} />
                    </Form.Item>
                    <Form.Item label="验证码" name={"verifyCode"}>
                        <Input className='authCode' suffix={
                            <Button type="text" style={{ fontSize: 16 }} className='input' onClick={sendVerifyCode}>
                                获取验证码
                            </Button>
                        }
                        />
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" className='button' htmlType="submit" >
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="bottom">
                <p><a href="#!" onClick={() => { skipPath("/register") }}>创建组织</a></p>
            </div>
        </>
    )
}

export default PasswordLogin