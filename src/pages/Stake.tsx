import React, { useContext, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Table from '../components/table/Table';
import useRequest from '../hooks/useRequest';
import { formatToken, formatPercent } from '../utils/helpers';
import Delegate from '../components/stake/Delegate';
import useApi from '../hooks/useApi';
import { store } from '../store';
import { Spinner } from 'react-bootstrap';
import { FlexJustifyCenter } from '../components/styled/Flex';

const WrapperTable = styled.div`
    background: white;
    height: 100vh;
    overflow: scroll;
`;

const Stake = () => {
    const { chain } = useContext(store);
    const { API } = useApi(chain);
    const { resp, isLoading, request } = useRequest();

    useEffect(() => {
        if (chain) {
            request(API.getValidators);
        }
    }, [chain]);

    const validators = useMemo(() => {
        if (!resp || !resp.length) return [];

        return resp;
    }, [resp]);

    const cols = [
        {
            key: 'rank',
            label: 'Rank',
        },
        {
            key: 'name',
            label: 'Name',
            process(data: any): JSX.Element {
                return (
                    <div style={{ width: '225px' }}>
                        {data.description.moniker}
                    </div>
                );
            },
        },
        {
            key: 'tokens',
            label: 'Voting power',
            process(data: any): JSX.Element {
                return (
                    <div style={{ width: '150px' }}>
                        {formatToken(data.delegator_shares, chain.coinDenom)}
                    </div>
                );
            },
        },
        {
            key: 'commission',
            label: 'Commission',
            process(data: any): JSX.Element {
                return (
                    <div>
                        {formatPercent(data.commission.commission_rates.rate)}
                    </div>
                );
            },
        },
        {
            key: 'button',
            label: '',
            process(data: any): JSX.Element {
                return (
                    <div style={{ width: '80px' }}>
                        <Delegate data={data} />
                    </div>
                );
            },
        },
    ];
    return (
        <>
            {isLoading ? (
                <FlexJustifyCenter>
                    <Spinner
                        animation="border"
                        role="status"
                        variant="primary"
                    />
                </FlexJustifyCenter>
            ) : (
                <WrapperTable>
                    <Table cols={cols} rows={validators} />
                </WrapperTable>
            )}
        </>
    );
};

export default Stake;
