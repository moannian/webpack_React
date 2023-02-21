import React, { useState, useImperativeHandle, useEffect } from "react";
import { Modal, Table } from "antd";
import useHttp from 'Http/useHttp';
import type { ColumnsType } from 'antd/es/table';
import "./index.less"


interface IProps {
    getData: (data: any) => void
}

interface DataType {
    id: React.Key;
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



const MemberModal = (props: IProps, ref: any) => {
    const { getData } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data } = useHttp<any>("/api/member");




    useImperativeHandle(ref, () => {
        return {
            showModal: () => {
                setIsModalOpen(true)
            },
        }
    })

    const cancel = () => {
        setIsModalOpen(false)
    }



    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            getData(selectedRows)
        },
        getCheckboxProps: (record: DataType) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };

    const onOk = () => {
        setIsModalOpen(false)
    }
    return (
        <Modal open={isModalOpen} onCancel={cancel} onOk={onOk} cancelText="取消" okText="确认" >
            <Table
                rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
            />
        </Modal>
    )
}

export default React.forwardRef(MemberModal)