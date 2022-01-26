import React from 'react';
import Stake from '../components/home/Stake';
import Box from '../components/styled/Box';
import { CustomContainer } from '../components/styled/Container';

const Home = () => {
    return (
        <Box
            color="linear-gradient(
          rgba(0, 0, 0, 0.1),
          rgba(255, 255, 255, 0.2)
          )"
        >
            <CustomContainer>
                <Stake />
            </CustomContainer>
        </Box>
    );
};

export default Home;
