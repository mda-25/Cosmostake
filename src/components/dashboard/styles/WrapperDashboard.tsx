import styled from 'styled-components';

const WrapperDashboardInfo = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(fit-content, auto);
    grid-gap: 20px;
`;

export { WrapperDashboardInfo };
