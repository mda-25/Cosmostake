import { toast } from 'react-toastify';

interface IToastrProps {
    promiseFunc(): Promise<any>;
    opt: {
        pending: string;
        success: string;
        error: string;
    };
}

const toastrHandle = (
    promiseFunc: any,
    opt = {
        pending: 'Waiting for dispatch',
        success: 'Success!',
        error: 'Promise rejected',
    },
) => {
    return toast.promise(promiseFunc, opt);
};

export default toastrHandle;
