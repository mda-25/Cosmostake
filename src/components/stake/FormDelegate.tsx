import React, { useContext, useState } from 'react';
import { Button, InputGroup } from 'react-bootstrap';
import { store } from '../../store';
import {
    convertMutezToInt,
    formatMinimalDenomToCoinDenom,
} from '../../utils/helpers';
import { WrapperBtn } from '../styled/Btn';
import { Form } from '../styled/Form';

interface IFormProps {
    handleClose(): void;
    handleDelegate({ to, amount }: any): void;
    validator: string;
}

const FormDelegate = ({
    handleClose,
    validator,
    handleDelegate,
}: IFormProps) => {
    const { chain, balance } = useContext(store);
    const [amount, setAmount] = useState<number>(0);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        handleDelegate({
            to: validator,
            amount,
        });

        handleClose();
    };

    const handleMaxAmount = () => {
        setAmount(convertMutezToInt(balance.amount));
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Delegate to</Form.Label>
                <Form.Control value={validator} disabled />
            </Form.Group>

            <Form.Group>
                <Form.Label>
                    Available balance:{' '}
                    {formatMinimalDenomToCoinDenom(
                        balance.amount,
                        chain.coinDenom,
                    )}
                </Form.Label>
            </Form.Group>

            <div>
                <Form.Label>Amount to Delegate</Form.Label>
                <InputGroup>
                    <Form.Control
                        type="number"
                        placeholder="Enter amount"
                        value={amount || ''}
                        onChange={(e) => {
                            setAmount(Number(e.target.value));
                        }}
                        required
                    />
                    <Button
                        variant="outline-primary"
                        id="button-addon2"
                        onClick={handleMaxAmount}
                    >
                        max
                    </Button>
                    <Form.Control.Feedback type="invalid">
                        not Available
                    </Form.Control.Feedback>
                </InputGroup>
            </div>

            <WrapperBtn>
                <Button variant="secondary" type="button" onClick={handleClose}>
                    Close
                </Button>

                <Button variant="primary" type="submit">
                    Delegate
                </Button>
            </WrapperBtn>
        </Form>
    );
};

export default FormDelegate;
