import styled from 'styled-components';

type TBox = {
    color?: string;
};

const Box = styled.div<TBox>`
    background: ${({ theme, color }) => color || theme.white};
`;

export default Box;
