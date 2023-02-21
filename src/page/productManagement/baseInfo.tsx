import React from "react";
import { Form, Input, Upload, Button, Select } from 'antd'
import { UploadOutlined } from '@ant-design/icons';

const BaseInfo = (props: any, ref: any) => {
    return (
        <Form
            ref={ref}
            layout={"vertical"}
        >
            {/* <Form.Item
                label="所属"
                name="conclude"
                rules={[{ required: true, message: "所属为必填" }]}
            >
                <Input />
            </Form.Item> */}
            <Form.Item
                label="产品logo"
                name="logo">
                <Upload
                    action="/api/upload/img"
                    listType="picture"
                    maxCount={1}
                    onChange={(e) => {
                        console.log(e)
                    }}
                >
                    <Button icon={<UploadOutlined />}>上传产品logo</Button>
                </Upload>
            </Form.Item>
            <Form.Item
                label="产品名称"
                name="title"
                rules={[{ required: true, message: "产品名称为必填" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="可见范围"
                name="scope"
                initialValue={"1"}
                rules={[{ required: true, message: "可见范围为必填" }]}
            >
                <Select

                    options={[
                        { value: '0', label: '私有' },
                        { value: '1', label: '公开' },
                    ]}
                />
            </Form.Item>
            <Form.Item
                label="产品标识"
                name="identifying"
                rules={[{ required: true, message: "产品标识为必填" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="描述"
                name="description"
            >
                <Input.TextArea rows={4} />
            </Form.Item>
        </Form>
    )
}

export default React.forwardRef(BaseInfo);