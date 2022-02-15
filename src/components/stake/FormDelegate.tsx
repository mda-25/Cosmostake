import React, { useContext } from 'react';
import { Button, InputGroup } from 'react-bootstrap';
import { store } from '../../store';
import {
    convertMutezToInt,
    formatMinimalDenomToCoinDenom,
} from '../../utils/helpers';
import { WrapperBtn } from '../styled/Btn';
import { Form } from '../styled/Form';
import { Formik, Field } from 'formik';
import * as yup from 'yup';

interface IFormProps {
    handleClose(): void;
    handleDelegate({ to, amount }: any): void;
    validator: string;
}

const schema = yup.object().shape({
    amount: yup
        .number()
        .required('Required')
        .min(0.1, 'Minimum value is 0.1')
        .test('amount', 'Max value', (val: any, props: any) => {
            return val < props.parent.balance;
        }),
});

const FormDelegate = ({
    handleClose,
    validator,
    handleDelegate,
}: IFormProps) => {
    const { chain, balance } = useContext(store);

    const handleSubmit = async (amount: number | string) => {
        handleDelegate({
            to: validator,
            amount,
        });

        handleClose();
    };

    return (
        <Formik
            validationSchema={schema}
            initialValues={{
                amount: '',
                balance: convertMutezToInt(balance.amount),
            }}
            onSubmit={(values) => {
                handleSubmit(values.amount);
            }}
        >
            {({
                handleSubmit,
                handleChange,
                values,
                errors,
                setFieldValue,
            }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Delegate to</Form.Label>
                        <Form.Control value={validator} disabled />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            Available balance:{' '}
                            {formatMinimalDenomToCoinDenom(
                                balance ? balance.amount : 0,
                                chain.coinDenom,
                            )}
                        </Form.Label>
                    </Form.Group>

                    <div>
                        <Form.Label>Amount to Delegate</Form.Label>
                        <InputGroup>
                            <Field
                                as={Form.Control}
                                type="number"
                                name="amount"
                                placeholder="Enter amount"
                                value={values.amount}
                                onChange={handleChange}
                                isInvalid={!!errors.amount}
                            />
                            <Field
                                as={Button}
                                variant="primary"
                                id="button-addon2"
                                onClick={() =>
                                    setFieldValue(
                                        'amount',
                                        Math.floor(
                                            convertMutezToInt(balance.amount),
                                        ),
                                    )
                                }
                            >
                                max
                            </Field>
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
                            Delegate
                        </Button>
                    </WrapperBtn>
                </Form>
            )}
        </Formik>
    );
};

export default FormDelegate;
