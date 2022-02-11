import { useMemo } from 'react';
import axios from 'axios';
import { IChainList } from '../interface/ChainList';

const useApi = (chain: IChainList) => {
    const api = useMemo(() => {
        return axios.create({
            baseURL: chain.rest,
            timeout: 30000,
        });
    }, [chain]);

    const API = {
        getValidators() {
            return api.get('/staking/validators');
        },
        getDelegations(address?: string) {
            return api.get(`/staking/delegators/${address}/delegations`);
        },
        getReward(delegator: string) {
            return api.get(`/distribution/delegators/${delegator}/rewards`);
        },
        getBalance(address: string) {
            return api.get(`/bank/balances/${address}`);
        },
        getUnbondingDelegation(address: string) {
            return api.get(
                `/staking/delegators/${address}/unbonding_delegations`,
            );
        },
    };

    return {
        API,
    };
};

export default useApi;
