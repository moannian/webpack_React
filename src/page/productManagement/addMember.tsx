import React, { useRef, useState, useImperativeHandle } from "react";
import { Button, Table } from "antd"
import { PlusOutlined } from '@ant-design/icons';
import { MemberModal } from "components";

import type { ColumnsType } from 'antd/es/table';
interface IModalRef {
    showModal: () => any
}

interface DataType {
    key: React.Key;
    name: string;
    position: string;
    department: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: '姓名',
        dataIndex: 'name',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: '职位',
        dataIndex: 'position',
    },
    {
        title: '部门',
        dataIndex: 'department',
    },
];
const AddMenber = (props: any, ref: any) => {
    const modalRef = useRef<IModalRef>()
    const [menberData, setMemberData] = useState([]);

    useImperativeHandle(ref, () => {
        return {
            getData: () => {
                return menberData
            }
        }
    })
    return (
        <div>
            <div className="addBtn">
                <span>成员</span>
                <Button type="link"
                    icon={<PlusOutlined />}
                    onClick={() => {
                        modalRef.current?.showModal()

                    }}> 添加成员</Button>
                <MemberModal
                    ref={modalRef}
                    getData={(data: any) => {
                        setMemberData(data)
                    }}
                />
            </div>

            <Table dataSource={menberData} columns={columns} className="menberTable" />;
        </div>
    )
}

export default React.forwardRef(AddMenber)