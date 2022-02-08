import styled from 'styled-components';

interface ITextProps {
    fs?: string;
}

const Text = styled.span<ITextProps>`
    font-weight: 400;
    font-size: ${(props) => props.fs || props.theme.fs16};
`;

export { Text };
