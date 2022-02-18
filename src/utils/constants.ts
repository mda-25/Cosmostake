import { IChainList } from '../interface/ChainList';

export const CHAIN_LIST_MAINNET: IChainList[] = [
    {
        name: 'cosmos',
        chainId: 'cosmoshub',
        coinMinimalDenom: 'uatom',
        coinDenom: 'ATOM',
        rest: 'https://api.cosmos.network',
        rpc: 'https://rpc.cosmos.network',
    },
    {
        name: 'osmosis',
        chainId: 'osmosis',
        coinMinimalDenom: 'uosmo',
        coinDenom: 'OSMO',
        rest: 'https://lcd-osmosis.keplr.app',
        rpc: 'https://rpc-osmosis.itastakers.com',
    },
    {
        name: 'kava',
        chainId: 'kava',
        coinMinimalDenom: 'ukava',
        coinDenom: 'KAVA',
        rest: 'https://lcd-kava.keplr.app',
        rpc: 'https://rpc.kava.io',
    },
];

export const CHAIN_LIST_TESTNET = [
    {
        name: 'vega-testnet',
        chainId: 'vega-testnet',
        coinMinimalDenom: 'uatom',
        coinDenom: 'ATOM',
        rest: 'http://198.50.215.1:3327',
        rpc: 'http://198.50.215.1:36657',
    },
    {
        name: 'Photon-testnet',
        chainId: 'cosmoshub-testnet',
        coinMinimalDenom: 'uphoton',
        coinDenom: 'PHOTON',
        rpc: 'https://rpc.testnet.cosmos.network:443',
        rest: 'https://api.testnet.cosmos.network:443',
    },
];
