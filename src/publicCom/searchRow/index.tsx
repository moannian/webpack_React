import React, { useEffect, useRef, useState } from "react";
import { Button, Input, InputRef } from "antd"
import "./index.less"
import { SearchOutlined } from '@ant-design/icons';

import useStore from "util/useStore"

type Foo = NonNullable<InputRef | null>


const btnType = [{
    id: 1,
    name: "全部"
}, {
    id: 2,
    name: "星标"
}, {
    id: 3,
    name: "最近访问"
}]

type a = keyof typeof btnType;
const SearchRow = () => {
    const searchRef = useRef<Foo>();
    const [btnTypeId, setBtnTypeId] = useState(1);
    const test = useStore("tableDataMobx")
    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if (e.ctrlKey && e.keyCode === 88) {
                searchRef.current?.focus()
                return
            }
        })

    }, [])

    const clickChooseType = (id: number) => {
        setBtnTypeId(id)
    }
    return (
        <div className="searchRow">
            <Input placeholder="搜索(Ctrl+X)"
                className="search"
                prefix={<SearchOutlined style={{ color: "#ddd" }} />}
                ref={searchRef as any} />
            <div className="chooseType" >
                {
                    btnType.map(item => {
                        return (
                            <Button className={item.id == btnTypeId ? "chooseBtnType" : "bg_slight_gray"}
                                key={item.id}
                                onClick={(e) => { clickChooseType(item.id) }}
                            >{item.name}</Button>
                        )
                    })
                }
            </div>
            <div className="totalProduct">统计产品</div>
        </div>
    )
}

export default SearchRow