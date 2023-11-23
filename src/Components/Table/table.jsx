import React, { useState } from 'react';
import { Button, Popconfirm, Space, Table, message, Modal, Form, Input, InputNumber } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ProductTable = ({ products }) => {
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editedProduct, setEditedProduct] = useState(null);
    const [form] = Form.useForm();
    const handleUpdate = (record) => {
        setIsEditModalVisible(true);
        setEditedProduct(record);
        form.setFieldsValue(record);
    };
    const handleEditSave = async () => {

        try {
            const response = await fetch(`https://dummyjson.com/products/${editedProduct.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({}),
            });

            if (response.ok) {
                message.success('Product updated successfully');
            } else {
                console.error(`Error updating product: ${response.status}`)
                message.error('Failed to update product');
            }

            setIsEditModalVisible(false);
        } catch (error) {
            console.error('Error updating product:', error);
            message.error('Failed to update product');
        }
    };

    const handleEditCancel = () => {
        setIsEditModalVisible(false);
    };
    const handleRemove = async (productId) => {
        try {
            const response = await fetch(`https://dummyjson.com/products/${productId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                message.success('Product deleted successfully');
            } else {
                console.error(`Error deleting product: ${response.status}`)
                message.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            message.error('Failed to delete product');
        }

    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text, record) => {
                return `$${record.price.toFixed(2)}`
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="small">
                    <Button type='link' icon={<EditOutlined />} onClick={() => handleUpdate(record)} />
                    <Popconfirm
                        title="Are you sure to delete this product?"
                        onConfirm={() => handleRemove(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type='link' icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </Space>
            )
        }
    ];
    const tableStyle = {
        width: '100%',

    }
    return (
        <div style={tableStyle}>
            <Table dataSource={products} columns={columns} pagination={false} />
            <Modal
                title="Edit Product"
                visible={isEditModalVisible}
                onCancel={handleEditCancel}
                footer={[
                    <Button key="cancel" onClick={handleEditCancel}>
                        Cancel
                    </Button>,
                    <Button key="save" type="primary" onClick={handleEditSave}>
                        Save
                    </Button>,
                ]}
            >
                <EditProductForm form={form} />
            </Modal>
        </div>
    )
};

const EditProductForm = ({ form, initialValues, onSave }) => {
    return (
        <Form
            form={form}
            initialValues={initialValues}
            onFinish={onSave}
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
    )
}

export default ProductTable;