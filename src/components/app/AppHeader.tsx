import React, { useContext } from 'react';
import styled from 'styled-components';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CustomContainer } from '../styled/Container';
import Box from '../styled/Box';
import AppChainList from './AppChainList';

const TheHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    padding: 10px 0;
`;

const AppHeader = () => {
    return (
        <Box color="linear-gradient(-10deg, #424a4f -3.02%, #131719 50.08%)">
            <CustomContainer>
                <TheHeader>
                    <Link to="/">
                        <Image src="https://cosmoscan.net/static/media/logo-blue.de555fac.svg" />
                    </Link>

                    <AppChainList />
                </TheHeader>
            </CustomContainer>
        </Box>
    );
};

export default AppHeader;
