import type { ChainInfo } from '@keplr-wallet/types';
import { Bech32Address } from '@keplr-wallet/cosmos';

export const ChainInfos: ChainInfo[] = [
    {
        chainId: 'vega-testnet',
        chainName: 'vega-testnet',
        rpc: 'http://198.50.215.1:36657',
        rest: 'http://198.50.215.1:3327',
        bip44: {
            coinType: 118,
        },
        bech32Config: Bech32Address.defaultBech32Config('cosmos'),
        currencies: [
            {
                coinDenom: 'ATOM',
                coinMinimalDenom: 'uatom',
                coinDecimals: 6,
                coinGeckoId: 'cosmos',
            },
        ],
        feeCurrencies: [
            {
                coinDenom: 'ATOM',
                coinMinimalDenom: 'uatom',
                coinDecimals: 6,
                coinGeckoId: 'cosmos',
            },
        ],
        stakeCurrency: {
            coinDenom: 'ATOM',
            coinMinimalDenom: 'uatom',
            coinDecimals: 6,
            coinGeckoId: 'cosmos',
        },
        coinType: 118,
        gasPriceStep: {
            low: 1,
            average: 1,
            high: 1,
        },
        features: ['stargate', 'no-legacy-stdTx', 'ibc-transfer'],
    },
    {
        chainId: 'cosmoshub-testnet',
        chainName: 'Photon',
        rpc: 'https://rpc.testnet.cosmos.network:443',
        rest: 'https://api.testnet.cosmos.network:443',
        // Staking coin information
        stakeCurrency: {
            // Coin denomination to be displayed to the user.
            coinDenom: 'PHOTON',
            // Actual denom (i.e. uatom, uscrt) used by the blockchain.
            coinMinimalDenom: 'uphoton',
            // # of decimal points to convert minimal denomination to user-facing denomination.
            coinDecimals: 6,
            // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
            // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
            // coinGeckoId: ""
        },
        // (Optional) If you have a wallet webpage used to stake the coin then provide the url to the website in `walletUrlForStaking`.
        // The 'stake' button in Keplr extension will link to the webpage.
        // walletUrlForStaking: "",
        // The BIP44 path.
        bip44: {
            // You can only set the coin type of BIP44.
            // 'Purpose' is fixed to 44.
            coinType: 118,
        },
        bech32Config: Bech32Address.defaultBech32Config('cosmos'),
        // List of all coin/tokens used in this chain.
        currencies: [
            {
                // Coin denomination to be displayed to the user.
                coinDenom: 'PHOTON',
                // Actual denom (i.e. uatom, uscrt) used by the blockchain.
                coinMinimalDenom: 'uphoton',
                // # of decimal points to convert minimal denomination to user-facing denomination.
                coinDecimals: 6,
                // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
                // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
                // coinGeckoId: ""
            },
        ],
        // List of coin/tokens used as a fee token in this chain.
        feeCurrencies: [
            {
                // Coin denomination to be displayed to the user.
                coinDenom: 'PHOTON',
                // Actual denom (i.e. uatom, uscrt) used by the blockchain.
                coinMinimalDenom: 'uphoton',
                // # of decimal points to convert minimal denomination to user-facing denomination.
                coinDecimals: 6,
                // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
                // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
                // coinGeckoId: ""
            },
        ],
        // (Optional) The number of the coin type.
        // This field is only used to fetch the address from ENS.
        // Ideally, it is recommended to be the same with BIP44 path's coin type.
        // However, some early chains may choose to use the Cosmos Hub BIP44 path of '118'.
        // So, this is separated to support such chains.
        coinType: 118,
        // (Optional) This is used to set the fee of the transaction.
        // If this field is not provided, Keplr extension will set the default gas price as (low: 0.01, average: 0.025, high: 0.04).
        // Currently, Keplr doesn't support dynamic calculation of the gas prices based on on-chain data.
        // Make sure that the gas prices are higher than the minimum gas prices accepted by chain validators and RPC/REST endpoint.
        gasPriceStep: {
            low: 0.01,
            average: 0.025,
            high: 0.04,
        },
    },
];
