import styled from 'styled-components';
import { Card as BCard } from 'react-bootstrap';

const Card = styled(BCard)`
    min-width: 250px;
    height: fit-content;
    background: ${({ theme }) => theme.gradientCard};
`;

export { Card };
