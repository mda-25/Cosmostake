import React, { FC } from 'react';
import styled from 'styled-components';
import AppHeader from '../components/app/AppHeader';
import { Routers } from '../router/Routers';
import AppFooter from '../components/app/AppFooter';
import AppNav from '../components/app/AppNav';
import { CustomContainer } from '../components/styled/Container';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const WrapperContent = styled.div`
    background: linear-gradient(0deg, #424a4f -10%, #8d9499);
`;

const StakeWrapper = styled.div`
    display: grid;
    justify-content: center;
    grid-template-columns: 25% 1fr;
    column-gap: 20px;
    margin: 20px 0;
    min-height: 100vh;
`;

const LayoutDefault: FC = () => {
    return (
        <Wrapper>
            <AppHeader />

            <WrapperContent>
                <CustomContainer>
                    <StakeWrapper>
                        <AppNav />

                        <Routers />
                    </StakeWrapper>
                </CustomContainer>
            </WrapperContent>

            <AppFooter />
        </Wrapper>
    );
};

export default LayoutDefault;
