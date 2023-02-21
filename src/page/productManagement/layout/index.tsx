import React, { useRef, useEffect } from 'react';
import { Button, Layout, Menu, Divider } from 'antd';
import type { MenuProps } from 'antd';
import { AppRouter } from "Router/index"
import "./index.less"
import { Header } from "components"
import { PlusOutlined } from '@ant-design/icons';
import Product from "../page/product"
import { all, team, organization, collectfill, config } from "assing/Image";
import useStore from "util/useStore"
import { toJS } from "mobx"
import { IRef } from "util/type"
import NewProduct from "../newProduct"

const { Content, Sider } = Layout;
export type MenuItem = Required<MenuProps>['items'][number];

interface IProps {
    SiderMenu: MenuItem[]
}



const RouterContent: React.FC<IProps> = React.memo((props) => {
    const newProductRef = useRef<IRef>()
    const productMobx = useStore("ProductMobx");

    const { Router, skipPath } = AppRouter();
    useEffect(() => {
        console.log(toJS(productMobx.collectProduct))
    }, [productMobx.collectProduct])

    return (
        <Layout className='layoutbox'>
            <Sider className="sider" width={280}>
                <Menu className="meun">
                    <Menu.Item disabled className='disable' >产品</Menu.Item>
                    <Menu.Item icon={<img src={all} />} className='menuItem'>
                        全部产品
                    </Menu.Item>
                    <Menu.Item icon={<img src={organization} />} >
                        组织产品
                    </Menu.Item>
                    <Menu.Item icon={<img src={team} />} >
                        团队产品
                    </Menu.Item>
                    <Divider style={{ margin: 2, padding: 0 }} />
                    <Menu.Item disabled className='disable' icon={<img src={collectfill} className="collect"></img>}>星标</Menu.Item>
                    {productMobx.collectProduct.map(item => {
                        return (
                            <Menu.Item icon={<img src={item.logo} />} key={item.id}>{item.title}</Menu.Item>
                        )
                    })}
                    <Divider style={{ margin: 2, padding: 0 }} />
                    <Menu.Item icon={<img src={config} />} >配置中心</Menu.Item>

                </Menu>
            </Sider>

            <Layout className="site-layout">
                <Header title='产品'
                    rightElement={(<Button type="primary" icon={<PlusOutlined />}
                        onClick={() => {
                            newProductRef.current?.openModal()
                        }}>新建产品</Button>)}
                />
                <Content className='content'>
                    <Product />
                </Content>
            </Layout>
            <NewProduct ref={newProductRef} />
        </Layout>
    )
})
export default RouterContent