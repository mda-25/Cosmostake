import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';
import Table from '../table/Table';
import { store } from '../../store';
import useRequest from '../../hooks/useRequest';
import { formatNumber, formatPercent } from '../../utils/helpers';
import Delegation from './Delegation';
import ListChains from './ChainList';

const StakeWrapper = styled.div`
    display: grid;
    justify-content: center;
    grid-template-columns: 20% 1fr;
    column-gap: 3%;
    margin: 20px 0;
    min-height: 100vh;
`;

const WrapperList = styled.div`
    overflow: scroll;
    border-radius: 10px;
    background: linear-gradient(
        100deg,
        rgb(66, 74, 79) -3.02%,
        rgb(19, 23, 25) 93.08%
    );
    box-shadow: rgb(2 3 3 / 50%) 20px 20px 50px;
`;

const ChainList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin: 0;
    padding: 0;
    list-style: none;
`;

const Li = styled.li<any>`
    cursor: pointer;
    padding: 5px 10px;
    font-size: 24px;
    color: ${(props) =>
        props.activeItem ? props.theme.lightBlue : props.theme.white};

    &:hover {
        background: rgba(128, 128, 128, 0.2);
    }
`;

const WrapperTable = styled.div`
    background: white;
    height: 100vh;
    overflow: scroll;
`;

const Stake = () => {
    const { resp, isLoading } = useRequest({
        path: '/staking/validators',
    });

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
                return <div>{data.description.moniker}</div>;
            },
        },
        {
            key: 'tokens',
            label: 'Voting power',
            process(data: any): JSX.Element {
                return <div>{formatNumber(data.tokens)}</div>;
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
                return <Delegation data={data} />;
            },
        },
    ];
    return (
        <StakeWrapper>
            <ListChains />

            <WrapperTable>
                <Table cols={cols} rows={validators} isLoading={isLoading} />
            </WrapperTable>
        </StakeWrapper>
    );
};

export default Stake;
function useState(arg0: boolean): [any, any] {
    throw new Error('Function not implemented.');
}
