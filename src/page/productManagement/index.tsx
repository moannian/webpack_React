import React, { useRef } from "react";
import RouterContent, { MenuItem } from "./layout";
import "./index.less";


const ProductManagement = () => {


    const MenuItem: MenuItem[] = [
        {
            label: "需求",
            key: "1",
            children: [{
                label: "产品",
                key: "product"
            }]
        },
        {
            label: "需求2",
            key: "2",
            children: [{
                label: "测试3",
                key: "2"
            }]
        }
    ];

    return (
        <div className="productManagement">
            <RouterContent SiderMenu={MenuItem} />

        </div>
    )
}

export default ProductManagement