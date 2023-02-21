import React, { useState, useRef, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
    HomeOutlined,
    AppstoreOutlined,
    BarsOutlined,
    ExperimentOutlined,
    ReadOutlined,
    RocketOutlined,
    TeamOutlined,
    UsbOutlined,
    FieldTimeOutlined,
    CodeSandboxOutlined
} from '@ant-design/icons';
import { Outlet } from "react-router-dom"
import ResizeObserver from 'resize-observer-polyfill';
import { AppRouter } from "Router/index"
import Header from "./header"
import "./index.less"

const { Content, Sider } = Layout;

export type MenuItem = Required<MenuProps>['items'][number];

export const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem => {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem("工作台", 'workbench', <HomeOutlined />),
    getItem('产品管理', 'productManagement', <AppstoreOutlined />),
    getItem('项目管理', 'projectManagement', <BarsOutlined />),
    getItem('测试管理', 'testManagement', <ExperimentOutlined />),
    getItem('知识管理', 'knowledgeManagement', <ReadOutlined />),
    getItem('效能度量', 'performanceMeasurement', <RocketOutlined />),
    getItem('协作空间', 'collaborationSpace', <TeamOutlined />),
    getItem('自动化', 'automation', <UsbOutlined />),
    getItem('工时管理', 'manHourManagement', <FieldTimeOutlined />),
    getItem('自建应用', 'SelfBuiltApplication', <CodeSandboxOutlined />),
];

export interface ILayoutHeaderInfo {
    label: string,
    icon: React.ReactNode
}


const App: React.FC = () => {

    const resizeRef = useRef<any>();
    const [collapsed, setCollapsed] = useState(false);
    const [opacity, setOpacity] = useState(0)
    const [defaultOpenMenu, setDefaultOpenMenu] = useState(location.pathname.split("/")[1] || "")
    const [layoutHeaderInfo, setLayoutHeaderInfo] = useState<ILayoutHeaderInfo>()
    const [pagePath, setPagePath] = useState<string>("workbench")

    const { Router, skipPath } = AppRouter()


    const ro = new ResizeObserver((entries, observer) => {
        for (const entry of entries) {
            const { left, top, width, height } = entry.contentRect;
            setOpacity((width - 80) / (220 - 80))
        }
    });

    useEffect(() => {
        ro.observe(resizeRef.current);
    }, [])

    useEffect(() => {
        let pageInfo = items.filter(element => element?.key === pagePath)[0];
        setLayoutHeaderInfo({ ...pageInfo } as ILayoutHeaderInfo)
    }, [pagePath])

    return (
        <Layout className="layout">
            <Sider ref={resizeRef} collapsible collapsed={collapsed} width={220} onCollapse={value => {
                setCollapsed(value)

            }} className="sider">
                <div className="top" >
                    <img src="https://cdn.pingcode.com/static/portal/assets/images/logos/transparent.svg?v=4.11.0" alt="李权的团队" title='李权的团队' />
                    {!collapsed ? <p style={{ color: `rgba(221, 221, 221,${opacity}) ` }}>李权的团队</p> : ""}
                </div>
                <Menu className="meun"
                    defaultSelectedKeys={[defaultOpenMenu]}
                    mode="inline"
                    items={items}
                    onClick={(info) => { skipPath(`/${info.key}`), setPagePath(info.key) }} />
            </Sider>
            <Layout className="site-layout">
                <Header layoutHeaderInfo={layoutHeaderInfo as ILayoutHeaderInfo} />
                <Content className='content'>
                    <Outlet />
                </Content>
            </Layout>
        </Layout >
    );
};

export default App;