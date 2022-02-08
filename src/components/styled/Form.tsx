import styled from 'styled-components';
import { Form as BForm, FormProps } from 'react-bootstrap';

const Form = styled(BForm)<FormProps>`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export { Form };
