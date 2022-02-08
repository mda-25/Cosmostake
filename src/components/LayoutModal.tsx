import React, { FC } from 'react';
import { Modal as BModal } from 'react-bootstrap';
import styled from 'styled-components';

interface IModalProps {
    handleClose(): void;
    show: boolean;
    title: string;
}

const Modal = styled(BModal)`
    color: black;
`;

const LayoutModal: FC<IModalProps> = ({
    children,
    handleClose,
    show,
    title,
}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title as="h5">{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>{children}</Modal.Body>
        </Modal>
    );
};

export default LayoutModal;
