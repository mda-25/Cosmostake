import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toastr = styled(ToastContainer)`
    .Toastify__toast {
        min-height: 65px;
        padding: 5px 20px;
        border-radius: 5px;
        font-family: Roboto, sans-serif;
        font-size: ${({ theme }) => theme.fs16};
    }
    .Toastify__toast-theme--light {
        background: ${({ theme }) => theme.blue.b10};
    }
    .Toastify__toast--success {
        color: ${({ theme }) => theme.gray.g80};
        background: ${({ theme }) => theme.lightGreen};
    }
    .Toastify__toast--error {
        color: white;
        background: ${({ theme }) => theme.error};
    }
    .Toastify__close-button {
        outline: none;
    }
`;

export default Toastr;
