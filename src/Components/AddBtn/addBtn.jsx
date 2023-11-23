import React, { useState } from 'react';
import { Modal, Button, Form, Input, InputNumber, message } from 'antd';
import "./addBtn.css"
import { FaPlus } from "react-icons/fa";

const AddProductModal = ({ visible, onCancel, onAdd }) => {
    const [form] = Form.useForm();

    const handleAdd = async () => {
        try {
            const formValues = await form.validateFields();
            const response = await fetch('https://dummyjson.com/products/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formValues),
            });
            message.success('Product added successfully');
        } catch (error) {
            console.error('Error adding product:', error);
            message.error('Failed to add product');
        }
        console.log('Product added!')
    };
    return (
        <Modal
            title="Add Product"
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="add" type="primary" onClick={handleAdd}>
                    Add
                </Button>,
            ]}
        >
            <Form
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
            >
                <Form.Item label="Title" name="title" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Description" name="description" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Price" name="price" rules={[{ required: true }]}>
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

const AddBtn = ({onAdd}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="add-btn">
            <FaPlus color="white" size={14} />
            <button onClick={showModal}>New Product</button>
            <AddProductModal
                visible={isModalVisible}
                onCancel={handleCancel}
                onAdd={onAdd}
            />
        </div>
    );
};

export default AddBtn;