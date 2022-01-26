import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { formatPercent } from '../../utils/helpers';
import styled from 'styled-components';

type TDelegationProps = {
    data: any;
};

const WrapperTitle = styled.div`
    display: flex;
    flex-direction: column;
`;

const Delegation = ({ data }: TDelegationProps) => {
    const [show, setShow] = useState<boolean>(false);
    const { description, commission } = data;

    const handleClose = (): void => setShow(false);
    const handleShow = (): void => setShow(true);
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Delegation
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <WrapperTitle>
                        <h4>{description.moniker}</h4>
                        <span>
                            Commission:{' '}
                            <span>
                                {formatPercent(
                                    commission.commission_rates.rate,
                                )}
                            </span>
                        </span>
                    </WrapperTitle>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                            />
                            <Form.Text className="text-muted">
                                Well never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicCheckbox"
                        >
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={handleClose}
                        >
                            Submit
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default Delegation;
