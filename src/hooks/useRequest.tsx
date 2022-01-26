import { useContext, useEffect, useMemo, useState } from 'react';
import { LcdClient } from '@cosmjs/launchpad';
import { store } from '../store';

type TRequestProps = {
    path: string;
    options?: any;
};

const useRequest = ({ path, options }: TRequestProps) => {
    const { chain } = useContext(store);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [resp, setResp] = useState<Array<any>>([]);

    const lcd = useMemo((): any => {
        if (!chain) return null;
        return new LcdClient(`https://lcd-${chain.node}.keplr.app`);
    }, [chain]);

    const request = async ({ path, options }: TRequestProps) => {
        try {
            setIsLoading(true);
            const data = await lcd.get(path, options);
            setResp(data.result);
        } catch (e: any) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!chain) return;
        request({ path, options });
    }, [chain]);

    return {
        request,
        isLoading,
        resp,
        setResp,
        setIsLoading,
    };
};

export default useRequest;
