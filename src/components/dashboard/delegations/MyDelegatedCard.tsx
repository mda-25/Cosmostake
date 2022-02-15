import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import {
    ellipsis,
    formatMinimalDenomToCoinDenom,
} from '../../../utils/helpers';
import { store } from '../../../store';
import useShowModal from '../../../hooks/useShowModal';
import LayoutModal from '../../LayoutModal';
import FormUndelegate from './FormUndelegate';
import type { IOption } from '../../../hooks/useStargateSDK';
import Card from '../../styled/Card';
import BtnCopy from '../../BtnCopy';
import { FlexAlignCenter } from '../../styled/Flex';

export interface IDelegatedProps {
    delegate: {
        delegation: {
            delegator_address: string;
            shares: string;
            validator_address: string;
        };
        balance: any;
    };
    handleUndelegate(opt?: IOption): void;
}

const MyDelegatedCard = ({ delegate, handleUndelegate }: IDelegatedProps) => {
    const { chain } = useContext(store);
    const { show, handleShow, handleClose } = useShowModal();
    const { delegation } = delegate;

    return (
        <Card>
            <Card.Header as="h5">Delegated</Card.Header>
            <Card.Body>
                <FlexAlignCenter>
                    Validator: {ellipsis(delegation.validator_address, 15, -5)}
                    <BtnCopy textToCopy={delegation.validator_address} />
                </FlexAlignCenter>

                <Card.Text>
                    Balance:{' '}
                    {formatMinimalDenomToCoinDenom(
                        Number(delegation.shares),
                        chain.coinDenom,
                    )}
                </Card.Text>

                <Button variant="primary" onClick={handleShow}>
                    Undelegate
                </Button>

                <LayoutModal
                    handleClose={handleClose}
                    show={show}
                    title="Undelegation"
                >
                    <FormUndelegate
                        delegate={delegate}
                        handleClose={handleClose}
                        handleUndelegate={handleUndelegate}
                    />
                </LayoutModal>
            </Card.Body>
        </Card>
    );
};

export default MyDelegatedCard;
