import React from 'react';
import styled from 'styled-components';
import Box from '../styled/Box';
import { CustomContainer } from '../styled/Container';

const CustomBox = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    color: white;
`;

const AppFooter = () => {
    const isYear = new Date().getFullYear();

    return (
        <CustomBox color="linear-gradient(0deg, #424a4f -3.02%, #131719 150.08%)">
            <CustomContainer>
                <span>© Everstake {isYear}. All rights reserved.</span>
            </CustomContainer>
        </CustomBox>
    );
};

export default AppFooter;
