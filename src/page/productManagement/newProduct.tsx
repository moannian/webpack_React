import React, { useEffect, useState, useRef, useImperativeHandle } from "react";
import { Button, Modal, Form, Input, Select, Upload } from 'antd';
import { finish } from "assing/Image";
import { IRef } from "util/type"
import BaseInfo from "./baseInfo";
import AddMenber from "./addMember";
import { getCurrentTime } from "util/day"
import useStore from "util/useStore"

interface IMemberRef extends IRef {

}


interface IDataRef {
    baseInfo: any,
    developer: any
}

const NewProduct = React.forwardRef((props: any, ref: any) => {
    const productMobx = useStore("ProductMobx")

    const [sence, setSence] = useState("first");
    const [open, setOpen] = useState(false);


    const baseInfoRef = useRef<HTMLFormElement>();
    const memberRef = useRef<IMemberRef>();

    let dataRef = useRef<IDataRef>({
        baseInfo: "",
        developer: "",

    })

    useImperativeHandle(ref, () => {
        return {
            openModal: () => {
                setOpen(true)
            }
        }
    })
    const switchSence = async (sence: string) => {
        switch (sence) {
            case 'next':
                let baseInfo = await baseInfoRef.current?.validateFields();
                baseInfo.logo = baseInfo.logo ? baseInfo.logo.file.response.url : ""
                dataRef.current.baseInfo = baseInfo
                setSence("complate")
                break;
            case 'last':
                setSence("first")
                break;
            case "cancel":
                setOpen(false)
                break;
            case "complate":
                let memberData = memberRef.current?.getData();
                dataRef.current.developer = JSON.stringify(memberData)
                submit()
                break;
            default:
                break;
        }
    }

    const submit = () => {
        let updataTime = getCurrentTime()
        let data = { ...dataRef.current.baseInfo, developer: dataRef.current.developer, collect: 0, maker: "liquan", updataTime };
        productMobx.addProduct(data, cancel)


    }

    const cancel = () => {
        setOpen(false)
    }

    const FooterUI = (
        <div>
            {sence === "first" ? <Button type="link" onClick={() => { switchSence("cancel") }}>取消</Button> : ""}
            {sence != "first" ? <Button type="link" onClick={() => { switchSence("last") }} >上一步</Button> : ""}
            {sence === "first" ? <Button type="primary" onClick={() => { switchSence("next") }}>下一步</Button> : ""}
            {sence != "first" ? <Button type="primary" onClick={() => { switchSence("complate") }}>完成</Button> : ""}
        </div>
    )

    return (
        <>
            <Modal title="新建项目" open={open} className="newProduct" footer={FooterUI} onCancel={cancel} >
                <div className="introduce">
                    <div className="pic">
                        <img src="https://cdn-aliyun.pingcode.com/static/ship/assets/images/intro-product.svg?v=4.79.0" alt="" />
                    </div>
                    <p>产品</p>
                    <p style={{ color: "#999" }}>产品与需求池管理，提供多维度的需求规划工具，打通客户、业务团队和产研团队之间的协作。</p>
                    <div className="effect">
                        <img src={finish} />
                        <span>模块化需求管理，构建清晰且统一的需求池</span>
                    </div>
                    <div className="effect">
                        <img src={finish} />
                        <span>标准化评估需求分数，统一衡量需求优先级</span>
                    </div> <div className="effect">
                        <img src={finish} />
                        <span>多渠道收集整理工单，搭建与客户之间的沟通平台</span>
                    </div>
                </div>
                <div className="from">
                    {sence == "first" ? <BaseInfo ref={baseInfoRef} /> : ""}
                    {sence == "complate" ? <AddMenber ref={memberRef} /> : ""}
                </div>

            </Modal>
        </>
    )
})

export default NewProduct