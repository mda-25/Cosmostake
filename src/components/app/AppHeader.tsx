import React, { useContext } from 'react';
import styled from 'styled-components';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CustomContainer } from '../styled/Container';
import Box from '../styled/Box';
import { store } from '../../store';

const TheHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    padding: 10px 0;
`;

const WrapperAddress = styled.div`
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    color: white;
`;

const AppHeader = () => {
    const { account, setAccount } = useContext(store);

    return (
        <Box color="linear-gradient(210.55deg, #424a4f -3.02%, #131719 93.08%)">
            <CustomContainer>
                <TheHeader>
                    <Link to="/">
                        <Image src="https://cosmoscan.net/static/media/logo-blue.de555fac.svg" />
                    </Link>

                    {account ? (
                        <WrapperAddress>{account.address}</WrapperAddress>
                    ) : (
                        <Button onClick={setAccount}>Connect</Button>
                    )}
                </TheHeader>
            </CustomContainer>
        </Box>
    );
};

export default AppHeader;
