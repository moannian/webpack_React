import React, { useState } from "react";
import { Drawer, Space } from 'antd';
import {
    BellOutlined
} from '@ant-design/icons';

interface IProps {

}

const Remind: React.FC<IProps> = React.memo((props) => {
    const [open, setOpen] = useState(false);


    return (
        <>
            <BellOutlined className="icon" onClick={() => { setOpen(true) }} />
            <Drawer
                title="Basic Drawer"
                closable={false}
                onClose={() => { setOpen(false) }}
                visible={open}
                placement="right"
            >
                我是提醒
            </Drawer>
        </>
    )
})

export default Remind