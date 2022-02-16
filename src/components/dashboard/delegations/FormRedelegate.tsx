import React from 'react';
import { Form } from '../../styled/Form';
import { Button, InputGroup } from 'react-bootstrap';
import { WrapperBtn } from '../../styled/Btn';
import { convertMutezToInt } from '../../../utils/helpers';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { IRedelegate } from '../../../hooks/useStargateSDK';
import { IDelegatedProps } from '../../../interface/Delegate';

interface IRedelegateProps extends IDelegatedProps {
    handleClose(): void;
    handleRequest(opt?: IRedelegate): void;
}

const schema = yup.object().shape({
    amount: yup
        .number()
        .required('Required')
        .test(
            'amount',
            'Max value',
            (val: any, props: any) => val <= props.parent.balance,
        ),
    validatorTo: yup.string().required('Required'),
});

const FormRedelegate = ({
    delegate,
    handleClose,
    handleRequest,
}: IRedelegateProps) => {
    const { delegation, balance } = delegate;

    const handleSubmit = (amount: number, validatorTo: string) => {
        handleRequest({
            delegator: delegation.delegator_address,
            validatorFrom: delegation.validator_address,
            validatorTo,
            amount,
            denom: balance.denom,
        });

        handleClose();
    };

    return (
        <Formik
            validationSchema={schema}
            initialValues={{
                amount: '',
                validatorTo: '',
                balance: convertMutezToInt(balance.amount),
            }}
            onSubmit={(values) => {
                if (typeof values.amount !== 'string') {
                    handleSubmit(values.amount, values.validatorTo);
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
                        <Form.Label>Validator current</Form.Label>
                        <Form.Control
                            value={delegation.validator_address}
                            disabled
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Validator to</Form.Label>
                        <Field
                            as={Form.Control}
                            name="validatorTo"
                            value={values.validatorTo}
                            onChange={handleChange}
                            isInvalid={!!errors.validatorTo}
                        />

                        <Form.Control.Feedback type="invalid">
                            {errors.validatorTo}
                        </Form.Control.Feedback>
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
                            Redelegate
                        </Button>
                    </WrapperBtn>
                </Form>
            )}
        </Formik>
    );
};

export default FormRedelegate;
