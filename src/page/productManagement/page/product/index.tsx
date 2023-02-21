import React, { useEffect, useState } from "react";
import { toJS } from "mobx"
import { Table, Dropdown, Space, Menu, Divider } from "antd"
import SearchRow from "../../../../publicCom/searchRow";
import useStore from "util/useStore";
import { detail, collect, share, more, menber, edit, moreDeploy, remove, collectfill } from "assing/Image"


const menu = (
    <Menu className="tableMenu">
        <Menu.Item >
            <div className="tableMenuItem flex">
                <img src={detail} />
                <p className="marginLeftTen">产品信息</p>
            </div>
        </Menu.Item>
        <Menu.Item>
            <div className="tableMenuItem flex">
                <img src={menber} />
                <p className="marginLeftTen">产品成员</p>
            </div>
        </Menu.Item>
        <Divider style={{ margin: 2, padding: 0 }} />
        <Menu.Item>
            <div className="tableMenuItem flex">
                <img src={edit} />
                <p className="marginLeftTen">编辑基本信息</p>
            </div>
        </Menu.Item>
        <Menu.Item>
            <div className="tableMenuItem flex">
                <img src={moreDeploy} />
                <p className="marginLeftTen">更多设置</p>
            </div>
        </Menu.Item>
        <Divider style={{ margin: 2, padding: 0 }} />
        <Menu.Item>
            <div className="tableMenuItem flex">
                <img src={remove} />
                <p className="marginLeftTen">回收站</p>
            </div>
        </Menu.Item>
    </Menu>
);


const Product = () => {
    const productMobx = useStore("ProductMobx");

    const [chooseRow, setChooseRow] = useState(-1)

    useEffect(() => {
        productMobx.getProductList()
    }, []);

    const columns = [
        {
            title: '产品',
            dataIndex: 'title',
            key: 'productName',
            width: "10%"
        },
        {
            title: '标识',
            dataIndex: 'identifying',
            key: 'identifying',
            width: "10%"
        },
        {
            title: '创建人',
            dataIndex: 'maker',
            key: 'maker',
            width: "20%"
        },
        {
            title: '更新时间',
            dataIndex: 'updataTime',
            key: 'updataTime',
            width: "40%"
        },
        {
            title: "",
            dataIndex: "operate",
            key: "operate",
            render: (e: any, b: any, index: any) => {
                return (
                    <div className={index == chooseRow ? "show flex" : "hide"} >
                        <div className="operate">
                            <img src={productMobx.productList[index].collect ? collectfill : collect} alt="" onClick={() => {
                                let collect = productMobx.productList[index].collect == 0 ? 1 : 0
                                productMobx.updateProduct({ id: productMobx.productList[index].id, collect })
                            }} />
                        </div>
                        <div className="operate">
                            <img src={share} alt="" />
                        </div>
                        <div className="operate">
                            <Dropdown overlay={menu} >
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <img src={more} alt="" />
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>
                    </div>
                )
            }
        },

    ];

    return (
        <div>
            <SearchRow />
            <Table
                dataSource={productMobx.productList || []}
                columns={columns}
                style={{ height: 100 }}
                rowKey={recode => recode.id}
                onRow={(record) => {
                    return {
                        onMouseEnter: (e: any) => {
                            const index = e.target.parentNode.getAttribute("data-row-key")
                            setChooseRow(index - 1)
                        },
                        onMouseLeave: () => {
                            setChooseRow(-1)
                        }
                    }
                }} />
        </div>
    )
}

export default Product