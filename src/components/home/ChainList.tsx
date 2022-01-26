import React, { useContext } from 'react';
import styled from 'styled-components';
import { store } from '../../store';
import { chainList } from '../../utils/constants';
import { capitalizeLetters } from '../../utils/helpers';

const WrapperList = styled.div`
    padding: 10px 20px;
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
    font-size: ${({ theme }) => theme.fs18};
    color: ${({ theme, activeItem }) =>
        activeItem ? theme.lightBlue : theme.white};

    &:hover {
        background: rgba(128, 128, 128, 0.2);
    }
`;

const Divider = styled.hr`
    color: ${({ theme }) => theme.white};
`;

const Link = styled.a<any>`
    cursor: pointer;
    font-size: ${({ theme }) => theme.fs20};
    color: ${({ theme }) => theme.lightGray};
    text-decoration: none;

    &:hover {
        color: ${({ theme }) => theme.lightBlue};
    }
`;

const Title = styled.h2`
    font-size: ${({ theme }) => theme.fs20};
    color: ${({ theme }) => theme.lightGray};
    font-weight: 400;
    text-transform: uppercase;
`;

const ListChains = () => {
    const { setAccount, chain } = useContext(store);

    return (
        <WrapperList>
            <Link
                href="https://cosmoscan.net/"
                target="_blank"
                rel="noreferrer"
            >
                Dashboard
            </Link>

            <Divider />

            <Title>Blockchain</Title>

            <ChainList>
                {chainList.map((blockchain, i) => (
                    <Li
                        key={i}
                        onClick={() => setAccount(blockchain)}
                        activeItem={chain.name === blockchain.name}
                    >
                        {capitalizeLetters(blockchain.name)}
                    </Li>
                ))}
            </ChainList>
        </WrapperList>
    );
};

export default ListChains;
