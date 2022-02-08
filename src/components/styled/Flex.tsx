import styled from 'styled-components';

const Flex = styled.div`
    display: flex;
`;

const FlexAlignCenter = styled(Flex)`
    align-items: center;
`;

const FlexJustifyCenter = styled(Flex)`
    justify-content: center;
`;

const FlexCenter = styled(Flex)`
    justify-content: center;
    align-items: center;
`;

export { Flex, FlexAlignCenter, FlexCenter, FlexJustifyCenter };
