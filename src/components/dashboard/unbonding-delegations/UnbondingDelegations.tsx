import React, { useContext, useEffect, useMemo } from 'react';
import { store } from '../../../store';
import useRequest from '../../../hooks/useRequest';
import useApi from '../../../hooks/useApi';
import { Spinner } from 'react-bootstrap';
import { FlexJustifyCenter } from '../../styled/Flex';
import { WrapperDashboardInfo } from '../styles/WrapperDashboard';
import UnbondingDelegationCard from './UnbondingDelegationCard';

const UnbondingDelegations = () => {
    const { chain, account } = useContext(store);
    const { API } = useApi(chain);
    const { request, resp, isLoading } = useRequest();

    useEffect(() => {
        if (account) {
            request(API.getUnbondingDelegation, account.address);
        }
    }, [account]);

    const unbondingDelegations = useMemo(() => {
        if (!resp || !resp.length) return [];

        return resp;
    }, [resp]);

    return (
        <>
            {isLoading ? (
                <FlexJustifyCenter>
                    <Spinner animation="border" />
                </FlexJustifyCenter>
            ) : unbondingDelegations.length ? (
                <WrapperDashboardInfo>
                    {unbondingDelegations.map((elem, i) => (
                        <UnbondingDelegationCard key={i} data={elem} />
                    ))}
                </WrapperDashboardInfo>
            ) : (
                <FlexJustifyCenter>Not unbonding delegations</FlexJustifyCenter>
            )}
        </>
    );
};

export default UnbondingDelegations;
