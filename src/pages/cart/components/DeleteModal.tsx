import { Modal } from 'antd';
import React from 'react';

interface PropsType {
    onOk: () => void;
    onCancel: () => void;
    productInfo: {
        id: string;
        productName: string;
        group1?: string;
        group2?: string;
    } | undefined;
    visible: boolean;
}

const DeleteModal = (props: PropsType) => {
    const { onOk, onCancel, productInfo, visible } = props;
    let modalContent = `Are You Sure To Delete ${productInfo?.productName}`;
    modalContent += (productInfo?.group1 ? ` - ${productInfo?.group1}` : '');
    modalContent += (productInfo?.group2 ? ` - ${productInfo?.group2}` : '');

    return (
        <Modal
            title={'Delete'}
            onOk={onOk}
            onCancel={onCancel}
            open={visible}
            zIndex={999999}
            closeIcon={null}
        >
            {modalContent}
        </Modal>
    )
}

export default DeleteModal;