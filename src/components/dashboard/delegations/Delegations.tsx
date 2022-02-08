import React, { useContext, useEffect, useMemo } from 'react';
import useLcdSDK from '../../../hooks/useLcdSDK';
import useRequest from '../../../hooks/useRequest';
import styled from 'styled-components';
import MyDelegatedCard from './MyDelegatedCard';
import { Spinner } from 'react-bootstrap';
import { store } from '../../../store';
import { FlexJustifyCenter } from '../../styled/Flex';
import useStargateSDK, { IOption } from '../../../hooks/useStargateSDK';
import { convertIntToMutez } from '../../../utils/helpers';

const WrapperDashboardInfo = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
`;

const Delegations = () => {
    const { account, chain, setBalance } = useContext(store);
    const { API } = useLcdSDK(chain);
    const delegate = useRequest();
    const { Undelegate } = useStargateSDK(chain);

    useEffect(() => {
        if (account) {
            delegate.request(API.getDelegations, account.address);
        }
    }, [account]);

    const handleUndelegate = async ({ from, to, amount, denom }: IOption) => {
        try {
            await Undelegate({
                from,
                to,
                amount: convertIntToMutez(amount),
                denom,
            });
            await setBalance(account.address, API.getBalance);
            await delegate.request(API.getDelegations, account.address);
        } catch (e: any) {
            console.error(e);
        }
    };

    const myDelegate = useMemo(() => {
        if (!delegate.resp) return [];

        return delegate.resp;
    }, [delegate.resp]);

    return (
        <div>
            {delegate.isLoading ? (
                <FlexJustifyCenter>
                    <Spinner animation="border" variant="primary" />
                </FlexJustifyCenter>
            ) : myDelegate.length ? (
                <WrapperDashboardInfo>
                    {myDelegate.map((delegate, i) => (
                        <MyDelegatedCard
                            key={i}
                            delegate={delegate}
                            handleUndelegate={handleUndelegate}
                        />
                    ))}
                </WrapperDashboardInfo>
            ) : (
                <FlexJustifyCenter>Not delegations</FlexJustifyCenter>
            )}
        </div>
    );
};

export default Delegations;
