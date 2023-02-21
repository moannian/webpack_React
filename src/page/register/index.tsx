import React, { useEffect, useState } from 'react';
import { Form, Card, Input, ColProps, Button } from "antd";
import { AppRouter } from "../../Router/index"
import { EmailInput } from "../../components/Input/index";
import useHttp from 'Http/useHttp';

import "./register.less"


const labelCol: ColProps = {
    span: 10,
    offset: 1,
}

const Register = () => {
    const { postData: sendVerify } = useHttp<any>("/api/verifyCode", false)
    const { postData: registerPost, data: registerData } = useHttp<any>("/api/register", false)
    const { skipPath } = AppRouter()
    const [emailContent, setEmailContent] = useState("")
    const [email, setEmail] = useState("")

    const sendVerifyCode = async () => {
        sendVerify({ email, type: "register" })
    }



    const finish = (e: any) => {
        registerPost(e)
    }

    const FormTitle = (
        <>
            <h1>填写信息</h1>
            <p>开启智能化研发管理之路</p>
        </>
    )

    return (
        <div className='register'>

            <div className='logo'>
                <img src="https://cdn.pingcode.com/static/pc-charm/assets/images/signup-pingcode-logo.svg?v=4.1.1" alt="" />
                <p className='text'>企业用户25人以下永久免费</p>
            </div>
            <div className='form'>
                <Card title={FormTitle} className='card' bordered={false}>
                    <Form layout="vertical" labelCol={labelCol} labelAlign="left" onFinish={finish}>
                        <Form.Item label="昵称" name={"ninkname"}>
                            <Input className='input'></Input>
                        </Form.Item>
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
                        <Form.Item label="验证码" name={"code"}>
                            <Input className='input' suffix={
                                <Button type="text" style={{ fontSize: 16 }} onClick={sendVerifyCode}>
                                    获取验证码
                                </Button>
                            }
                            />
                        </Form.Item>
                        <Form.Item label="密码" name={"password"}>
                            <Input className='input'></Input>
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" className='button' htmlType="submit">
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                    <Button type="link" style={{ fontSize: 16 }} onClick={() => {
                        skipPath("/login")
                    }}>已有账号,去登录</Button>
                </Card>
            </div>

        </div >
    )
}
export default Register