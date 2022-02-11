import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { store } from '../../store';
import { CHAIN_LIST_MAINNET, CHAIN_LIST_TESTNET } from '../../utils/constants';
import {
    capitalizeLetters,
    ellipsis,
    formatMinimalDenomToCoinDenom,
} from '../../utils/helpers';
import { NavLink, useHistory } from 'react-router-dom';
import { Text } from '../styled/Text';
import { Flex } from '../styled/Flex';
import useApi from '../../hooks/useApi';
import useThemeContext from '../../hooks/useThemeContext';
import BtnCopy from '../BtnCopy';

const WrapperList = styled.div`
    padding: 10px 20px;
    overflow: scroll;
    border-radius: 5px;
    background: ${({ theme }) => theme.gradientNav};
    box-shadow: rgb(2 3 3 / 50%) 20px 20px 50px;
`;

const WrapperAccount = styled(Flex)`
    flex-direction: column;
    gap: 20px;
    min-height: 75px;
`;

const ChainList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin: 10px 0 0;
    padding: 0;
    list-style: none;
`;

const Li = styled.li<any>`
    cursor: pointer;
    padding: 5px 10px;
    font-size: ${({ theme }) => theme.fs18};
    color: ${({ theme, activeitem }) => activeitem || theme.white};
    text-decoration: none;

    &:hover {
        color: ${({ theme }) => theme.white};
        background: rgba(128, 128, 128, 0.2);
    }
`;

const Divider = styled.hr`
    color: ${({ theme }) => theme.white};
`;

const Link = styled(NavLink)`
    cursor: pointer;
    font-size: ${({ theme }) => theme.fs18};
    color: ${({ theme }) => theme.gray.g20};
    text-decoration: none;
    font-weight: 400;
    text-transform: uppercase;

    &:hover {
        color: ${({ theme }) => theme.blue.b40};
    }
    &.${(props) => props.activeClassName} {
        color: ${({ theme }) => theme.blue.b60};
    }
`;

const Title = styled.h2`
    font-size: ${({ theme }) => theme.fs18};
    color: ${({ theme }) => theme.gray.g40};
    font-weight: 400;
    text-transform: uppercase;
`;

const AppNav = () => {
    const theme = useThemeContext();
    const { setAccount, chain, account, setBalance, balance } =
        useContext(store);
    const { API } = useApi(chain);
    const history = useHistory();

    useEffect(() => {
        if (account) {
            setBalance(account.address, API.getBalance);
        }
    }, [account]);

    const handleSetAccount = (chooseChain: any) => {
        setAccount(chooseChain);
        history.replace(`/stake/${chooseChain.chainId}`);
    };

    return (
        <WrapperList>
            {account && (
                <WrapperAccount>
                    <Text fs="18px">
                        {ellipsis(account.address)}
                        <BtnCopy textToCopy={account.address} />
                    </Text>

                    <div>
                        <h5>Balance</h5>
                        <h5>
                            {formatMinimalDenomToCoinDenom(
                                balance ? balance.amount : 0,
                                chain.coinDenom,
                            )}
                        </h5>
                    </div>
                </WrapperAccount>
            )}

            <Divider />

            <Link to="/dashboard" activeClassName="selected">
                Dashboard
            </Link>

            <Divider />

            <Title>Blockchain</Title>

            <ChainList>
                {CHAIN_LIST_MAINNET.map((blockchain, i) => (
                    <Li
                        key={i}
                        // as={NavLink}
                        // to={`/stake/${blockchain.chainId}`}
                        onClick={() => handleSetAccount(blockchain)}
                        activeitem={
                            chain.name === blockchain.name ? theme.blue.b60 : ''
                        }
                    >
                        {capitalizeLetters(blockchain.name)}
                    </Li>
                ))}
            </ChainList>

            <Divider />

            <ChainList>
                {CHAIN_LIST_TESTNET.map((blockchain, i) => (
                    <Li
                        key={i}
                        // as={NavLink}
                        // to={`/stake/${blockchain.chainId}`}
                        onClick={() => handleSetAccount(blockchain)}
                        activeitem={
                            chain.name === blockchain.name ? theme.blue.b60 : ''
                        }
                    >
                        {capitalizeLetters(blockchain.name)}
                    </Li>
                ))}
            </ChainList>
        </WrapperList>
    );
};

export default AppNav;
