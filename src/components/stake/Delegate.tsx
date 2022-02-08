import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import LayoutModal from '../LayoutModal';
import FormDelegate from './FormDelegate';
import useShowModal from '../../hooks/useShowModal';
import { capitalizeLetters, convertIntToMutez } from '../../utils/helpers';
import useStargateSDK from '../../hooks/useStargateSDK';
import useLcdSDK from '../../hooks/useLcdSDK';
import { store } from '../../store';

type TDelegationProps = {
    data: any;
};

type THandleDelegateProps = {
    to: string;
    amount: number;
};

const Delegate = ({ data }: TDelegationProps) => {
    const { account, chain, setBalance } = useContext(store);

    const { show, handleShow, handleClose } = useShowModal();
    const { operator_address: validator, description } = data;
    const { Delegate } = useStargateSDK(chain);
    const { API } = useLcdSDK(chain);

    const handleDelegate = async ({ to, amount }: THandleDelegateProps) => {
        try {
            await Delegate({
                from: account.address,
                to,
                amount: convertIntToMutez(amount),
                denom: chain.coinMinimalDenom,
            });

            await setBalance(account.address, API.getBalance);
        } catch (e: any) {
            console.error(e);
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Delegation
            </Button>

            <LayoutModal
                handleClose={handleClose}
                show={show}
                title={capitalizeLetters(description.moniker)}
            >
                <FormDelegate
                    validator={validator}
                    handleClose={handleClose}
                    handleDelegate={handleDelegate}
                />
            </LayoutModal>
        </>
    );
};

export default Delegate;
