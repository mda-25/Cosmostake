import React, { useState } from 'react';
import { IDelegatedProps } from './MyDelegatedCard';
import { Form } from '../../styled/Form';
import { Button, InputGroup } from 'react-bootstrap';
import { WrapperBtn } from '../../styled/Btn';
import { convertMutezToInt } from '../../../utils/helpers';

interface IUndelegateProps extends IDelegatedProps {
    handleClose(): void;
}

const FormUndelegate = ({
    delegate,
    handleClose,
    handleUndelegate,
}: IUndelegateProps) => {
    const [amount, setAmount] = useState<number>(0);
    const { delegation, balance } = delegate;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        handleUndelegate({
            from: delegation.delegator_address,
            to: delegation.validator_address,
            amount: amount,
            denom: balance.denom,
        });

        handleClose();
    };

    const handleMaxValue = () => {
        setAmount(convertMutezToInt(balance.amount));
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Delegate to</Form.Label>
                <Form.Control value={delegation.validator_address} disabled />
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
                        onClick={handleMaxValue}
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
                    Undelegat
                </Button>
            </WrapperBtn>
        </Form>
    );
};

export default FormUndelegate;
