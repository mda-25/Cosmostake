import styled from 'styled-components';

interface GridProps {
    col?: string;
    gap?: string;
}

const Grid = styled.div`
    display: grid;
`;

const GridColumns = styled(Grid)<GridProps>`
    grid-template-columns: ${({ col }) => col};
    column-gap: ${({ gap }) => gap};
`;

export { Grid, GridColumns };
