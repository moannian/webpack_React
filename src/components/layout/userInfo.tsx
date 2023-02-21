import React, { useEffect } from "react";
import { Card, Menu } from "antd";
import { observer } from "mobx-react-lite"
import {
    SettingOutlined,
    BellOutlined,
    ExclamationCircleOutlined,
    MenuFoldOutlined

} from '@ant-design/icons';
import { removeStoredAuthToken } from "shared/utils/authToken"
import useStore from "util/useStore"

const { Item } = Menu


const UserInfo = () => {

    const { userInfo } = useStore("userInfo")

    const TitleUi = (
        <div className="title">
            <div className="img">
                <img src="https://cdn-aliyun.pingcode.com/static/portal/assets/images/user-menu-bg.svg" alt="" />
            </div>
            <div className="content">
                {userInfo?.nickName}
            </div>
            <div className="ciecle"> {userInfo?.nickName}</div>
        </div>
    )

    return (
        <div className="userCard">

            <Card title={TitleUi} className="card">
                <Menu>
                    <Item icon={<SettingOutlined />} key="1">
                        账号设置
                    </Item>
                    <Item icon={<BellOutlined />} key="2">
                        推送管理
                    </Item>
                    <Item icon={<ExclamationCircleOutlined />} key="3" onClick={() => { }}>
                        关于
                    </Item>
                    <Item
                        icon={<MenuFoldOutlined />}
                        onClick={() => {
                            removeStoredAuthToken()
                            window.location.reload()
                        }}
                        key="4"
                    >
                        退出登录
                    </Item>
                </Menu>
            </Card>
        </div>
    )
}

export default observer(UserInfo)