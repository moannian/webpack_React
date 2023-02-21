import React, { useState } from "react";
import { Drawer, Space } from 'antd';
import {
    QuestionCircleOutlined
} from '@ant-design/icons';

interface IProps {
    // onClose: () => void,
    // open: boolean
}
const Help: React.FC<IProps> = React.memo((props) => {
    const [open, setOpen] = useState(false);


    return (
        <>
            <QuestionCircleOutlined className="icon" onClick={() => { setOpen(true) }} />
            <Drawer
                title="Basic Drawer"
                closable={false}
                onClose={() => { setOpen(false) }}
                visible={open}
                placement="right"
            >
                我是帮助
            </Drawer>
        </>
    )
})

export default Help