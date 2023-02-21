import React, { useState, useEffect } from "react";
import { Button, Form, ColProps, Input, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { EmailInput } from "../../components/Input/index";
import { AppRouter } from "../../Router/index"
import useHttp from 'Http/useHttp';
import ILogin from "apiBackType/login";
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
    const [emailContent, setEmailContent] = useState("")
    const { postData, data } = useHttp<ILogin>("/api/login", false)

    useEffect(() => {
        if (data?.code == 200) {
            message.success("登录成功")
            storeAuthToken(data.data.token)
        }
    }, [data])


    const finish = async (event: any) => {
        try {
            await postData({
                type: "email",
                ...event
            })
        } catch (error) {

        }
    }
    return (<>
        <p className="title">登录</p>
        <p className="hint">通过帐号密码登录组织，或者切换为
            <a href="#!"
                onClick={() => {
                    props.change()
                }}>邮箱验证码登录</a>
        </p>
        <div className="form" >
            <Form layout="vertical" labelCol={labelCol} labelAlign="left" onFinish={finish}>
                <Form.Item label="邮箱号" name={"email"}>
                    <EmailInput
                        className='input'
                        emailContent={emailContent}
                        onChange={(e) => {
                            let valueList = e.target.value.split(".")
                            if (!(valueList.length >= 2)) {
                                setEmailContent(e.target.value)
                            }
                        }} />
                </Form.Item>
                <Form.Item label="密码" name={"password"}>
                    <Input.Password
                        className='input'
                        style={{ "fontSize": "24px" }}
                        iconRender={visible => (visible ? <EyeTwoTone style={{ "fontSize": "24px" }} /> : <EyeInvisibleOutlined style={{ "fontSize": "24px" }} />)}
                    ></Input.Password>
                </Form.Item>
                <Form.Item >
                    <Button type="primary" className='button' htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
        <div className="bottom">
            <p><a href="#!" onClick={() => { skipPath("/register") }}>创建组织</a></p>
            <p><a href="#!">忘记密码</a></p>
        </div>
    </>)
}

export default PasswordLogin