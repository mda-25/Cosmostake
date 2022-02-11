import React from 'react';
import { IDelegatedProps } from './MyDelegatedCard';
import { Form } from '../../styled/Form';
import { Button, InputGroup } from 'react-bootstrap';
import { WrapperBtn } from '../../styled/Btn';
import { convertMutezToInt } from '../../../utils/helpers';
import { Formik, Field } from 'formik';
import * as yup from 'yup';

interface IUndelegateProps extends IDelegatedProps {
    handleClose(): void;
}

const schema = yup.object().shape({
    amount: yup.number().required('Required').min(0.1, 'Minimum value is 0.1'),
});

const FormUndelegate = ({
    delegate,
    handleClose,
    handleUndelegate,
}: IUndelegateProps) => {
    const { delegation, balance } = delegate;

    const handleSubmit = (amount: number) => {
        handleUndelegate({
            from: delegation.delegator_address,
            to: delegation.validator_address,
            amount,
            denom: balance.denom,
        });

        handleClose();
    };

    return (
        <Formik
            validationSchema={schema}
            initialValues={{ amount: '' }}
            onSubmit={(values) => {
                if (typeof values.amount !== 'string') {
                    handleSubmit(values.amount);
                }
            }}
        >
            {({
                handleSubmit,
                handleChange,
                values,
                errors,
                setFieldValue,
            }) => (
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Delegate to</Form.Label>
                        <Form.Control
                            value={delegation.validator_address}
                            disabled
                        />
                    </Form.Group>

                    <div>
                        <Form.Label>Amount to Delegate</Form.Label>
                        <InputGroup>
                            <Field
                                as={Form.Control}
                                name="amount"
                                type="number"
                                placeholder="Enter amount"
                                value={values.amount}
                                onChange={handleChange}
                                isInvalid={!!errors.amount}
                            />
                            <Button
                                variant="outline-primary"
                                id="button-addon2"
                                onClick={() =>
                                    setFieldValue(
                                        'amount',
                                        convertMutezToInt(
                                            Number(delegation.shares),
                                        ),
                                    )
                                }
                            >
                                max
                            </Button>
                            <Form.Control.Feedback type="invalid">
                                {errors.amount}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </div>

                    <WrapperBtn>
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={handleClose}
                        >
                            Close
                        </Button>

                        <Button variant="primary" type="submit">
                            Undelegat
                        </Button>
                    </WrapperBtn>
                </Form>
            )}
        </Formik>
    );
};

export default FormUndelegate;
