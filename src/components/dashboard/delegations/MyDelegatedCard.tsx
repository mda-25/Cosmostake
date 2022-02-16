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
import type { IOption, IRedelegate } from '../../../hooks/useStargateSDK';
import Card from '../../styled/Card';
import BtnCopy from '../../BtnCopy';
import { FlexAlignCenter } from '../../styled/Flex';
import { GridColumns } from '../../styled/Grid';
import FormRedelegate from './FormRedelegate';
import { IDelegatedProps } from '../../../interface/Delegate';

interface IDelegateEvents extends IDelegatedProps {
    handleUndelegate(opt?: IOption): void;
    handleRedelegate(opt?: IRedelegate): void;
}

const MyDelegatedCard = ({
    delegate,
    handleRedelegate,
    handleUndelegate,
}: IDelegateEvents) => {
    const { chain } = useContext(store);
    const { show, handleShow, handleClose } = useShowModal();
    const {
        show: showRedelegate,
        handleShow: handleShowRedelegate,
        handleClose: handleCloseRedelegate,
    } = useShowModal();
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

                <GridColumns col="repeat(2, 1fr)" gap="10px">
                    <Button variant="primary" onClick={handleShow}>
                        Undelegate
                    </Button>

                    <Button variant="primary" onClick={handleShowRedelegate}>
                        Redelegate
                    </Button>
                </GridColumns>

                <LayoutModal
                    handleClose={handleClose}
                    show={show}
                    title="Undelegation"
                >
                    <FormUndelegate
                        delegate={delegate}
                        handleClose={handleClose}
                        handleRequest={handleUndelegate}
                    />
                </LayoutModal>

                <LayoutModal
                    handleClose={handleCloseRedelegate}
                    show={showRedelegate}
                    title="Redelegate"
                >
                    <FormRedelegate
                        delegate={delegate}
                        handleClose={handleCloseRedelegate}
                        handleRequest={handleRedelegate}
                    />
                </LayoutModal>
            </Card.Body>
        </Card>
    );
};

export default MyDelegatedCard;
