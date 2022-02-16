import { useState } from 'react';

export type TFunc = {
    (opt?: any): any;
};

const useRequest = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [resp, setResp] = useState<any>({});

    const request = async (func: TFunc, opt?: any) => {
        try {
            setIsLoading(true);
            const data = await func(opt);

            setResp(data.data);
        } catch (e: any) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        request,
        isLoading,
        resp,
    };
};

export default useRequest;
