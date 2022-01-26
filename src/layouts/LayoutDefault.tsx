import React, { FC } from 'react';
import styled from 'styled-components';
import AppHeader from '../components/app/AppHeader';
import { Routers } from '../router/Routers';
import AppFooter from '../components/app/AppFooter';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const LayoutDefault: FC = () => {
    return (
        <Wrapper>
            <AppHeader />
            <Routers />
            <AppFooter />
        </Wrapper>
    );
};

export default LayoutDefault;
