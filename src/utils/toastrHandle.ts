import { toast } from 'react-toastify';
import { DeliverTxResponse } from '@cosmjs/stargate';

const toastrHandle = (
    promiseFunc: any,
    opt = {
        pending: 'Waiting for dispatch',
        // success: 'Success!',
        error: 'Promise rejected',
    },
): Promise<DeliverTxResponse> => {
    return toast.promise(promiseFunc, opt);
};

export default toastrHandle;
