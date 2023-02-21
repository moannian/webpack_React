import React, { useState, useEffect } from "react";
import { Layout, Input, Dropdown, Drawer } from 'antd';
import {
    SearchOutlined,
    AlignCenterOutlined,
    PlusCircleFilled,
    BellOutlined,
} from '@ant-design/icons';
import { ILayoutHeaderInfo } from "./layout";
import Menu from "../Menu/index";
import UserInfo from "./userInfo";
import Help from "./help";
import Remind from "./remind";
import UserInfoMobx from "../../mobx/userInfoMobx"


interface IProps {
    layoutHeaderInfo: ILayoutHeaderInfo
}

const { Header } = Layout


interface ItemType {
    path: string,
    icon?: React.ReactNode;
    label?: React.ReactNode;
    suffix?: React.ReactNode;
    children?: ItemType[];
    isfixes?: boolean
}

const addList = [
    {
        icon: < PlusCircleFilled />,
        label: "1",
        path: "1",
        suffix: <AlignCenterOutlined />,
        isfixes: true,
    },
    {
        icon: < PlusCircleFilled />,
        label: "2",
        path: "2",
        suffix: <AlignCenterOutlined />,
        isfixes: false,

    },
    {
        icon: < PlusCircleFilled />,
        label: "3",
        path: "3",
        suffix: <AlignCenterOutlined />,
        isfixes: false,
    },
]
const LayoutHeader: React.FC<IProps> = React.memo((props) => {

    const { layoutHeaderInfo } = props
    const [searchInput, setSearchInput] = useState<boolean>(false)

    const [moreItem, setMoreList] = useState<ItemType[]>([])


    const skipHighSearch = () => {
        console.log("跳转到高级搜索");

    }

    useEffect(() => {
        let isfixed = addList.filter(item => item.isfixes == true)
        let more = addList.filter(item => item.isfixes == false)
        setMoreList([...isfixed, {
            icon: < PlusCircleFilled />,
            label: "更多",
            path: "3",
            children: more
        }])
    }, [])

    let cancelFixed = (path: string) => {
        addList.forEach(item => {
            if (item.path == path) {
                item.isfixes = !(item.isfixes)
                return
            }
        })
        let isfixed = addList.filter(item => item.isfixes == true)
        let more = addList.filter(item => item.isfixes == false)
        setMoreList([...isfixed, {
            icon: < PlusCircleFilled />,
            label: "更多",
            path: "3",
            children: more
        }])


    }
    return (<>
        <Header className="site-layout-header" style={{ padding: 0 }} >
            <div className='title'>
                <div className="icon">{layoutHeaderInfo?.icon}</div>
                <div className='label'>{layoutHeaderInfo?.label}</div>
            </div>
            <div className="search">
                <Input className={searchInput ? "focus_search" : "blur_search"}
                    prefix={<SearchOutlined />}
                    suffix={<AlignCenterOutlined onClick={skipHighSearch} />}
                    onFocus={() => {
                        setSearchInput(true)
                    }}
                    onBlur={() => {
                        setSearchInput(false)
                    }}
                    onKeyDown={(e) => {
                        if (e.keyCode == 13) {
                            skipHighSearch()
                        }
                    }}
                />
            </div>
            {/* 更多 */}
            <div className="more">
                <Dropdown overlay={
                    <Menu
                        className="a"
                        items={moreItem}
                        cancelFixed={cancelFixed}
                    />
                } placement="bottomRight" arrow={{ pointAtCenter: true }}>
                    <PlusCircleFilled className="icon" />
                </Dropdown>
            </div>
            {/* 指导 */}
            <div className='guide'>
                <Help />
            </div>
            {/* 提醒 */}
            <div className='remind'>
                <Remind />
            </div>
            {/* 用户信息 */}
            <div className='userInfo'>
                <Dropdown
                    overlay={
                        <UserInfo />
                    }
                    trigger={['click']}
                    placement="bottomRight"
                    arrow={{ pointAtCenter: true }}>
                    <div className="userIcon">
                        年
                    </div>
                </Dropdown>
            </div>
        </Header>

    </>)
})

export default LayoutHeader