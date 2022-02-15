import styled from 'styled-components';
import { Card as BCard } from 'react-bootstrap';

const Card = styled(BCard)`
    min-width: 250px;
    background: ${({ theme }) => theme.gradientCard};
`;

Card.Body = styled.div`
    display: grid;
    row-gap: 10px;
    padding: 10px 20px;
`;

export default Card;
