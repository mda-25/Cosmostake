import { useMemo } from 'react';
import axios from 'axios';
import { IChainList } from '../interface/ChainList';
import { CHAIN_LIST_MAINNET } from '../utils/constants';

const useApi = (chain: IChainList) => {
    const api = useMemo(() => {
        const localStoreChain = localStorage.getItem('chain');
        if (typeof localStoreChain === 'string') {
            const localChain = JSON.parse(localStoreChain);
            return axios.create({
                baseURL: localChain.rest,
                timeout: 30000,
            });
        }
        return axios.create({
            baseURL: CHAIN_LIST_MAINNET[0].rest,
            timeout: 30000,
        });
    }, [chain]);

    const API = {
        getValidators() {
            // return api.get('/staking/validators');
            return api.get('/cosmos/staking/v1beta1/validators');
        },
        getDelegations(address?: string) {
            return api.get(`/cosmos/staking/v1beta1/delegations/${address}`);
            // return api.get(`/staking/delegators/${address}/delegations`);
        },
        getReward(delegator: string) {
            return api.get(
                `/cosmos/distribution/v1beta1/delegators/${delegator}/rewards`,
            );
            // return api.get(`/distribution/delegators/${delegator}/rewards`);
        },
        getBalance(address: string) {
            return api.get(`/cosmos/bank/v1beta1/balances/${address}`);
            // return api.get(`/bank/balances/${address}`);
        },
        getUnbondingDelegation(address: string) {
            return api.get(
                `/cosmos/staking/v1beta1/delegators/${address}/unbonding_delegations`,
                // `/staking/delegators/${address}/unbonding_delegations`,
            );
        },
    };

    return {
        API,
    };
};

export default useApi;
