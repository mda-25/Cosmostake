import { useMemo } from 'react';
import { LcdClient } from '@cosmjs/launchpad';
import { IChainList } from '../interface/ChainList';

const useLcdSDK = (chain: IChainList) => {
    const lcd = useMemo(() => {
        const localStoreChain = localStorage.getItem('chain');

        if (typeof localStoreChain === 'string') {
            const localChain: IChainList = JSON.parse(localStoreChain);
            return new LcdClient(localChain.rest);
        }

        return new LcdClient(chain.rest);
    }, [chain]);

    const API = {
        getValidators() {
            return lcd.get('/staking/validators');
        },
        getDelegations(address?: string) {
            return lcd.get(`/staking/delegators/${address}/delegations`);
        },
        getReward(delegator: string) {
            return lcd.get(`/distribution/delegators/${delegator}/rewards`);
        },
        getBalance(address: string) {
            return lcd.get(`/bank/balances/${address}`);
        },
    };

    return {
        API,
    };
};

export default useLcdSDK;
