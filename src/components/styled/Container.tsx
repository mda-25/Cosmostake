import styled from 'styled-components';
import { Container } from 'react-bootstrap';

export const CustomContainer = styled(Container)`
    margin: 0 auto;
    max-width: 1400px;

    @media (max-width: 1400px) {
        padding: 0 10px;
    }
`;
