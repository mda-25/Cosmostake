import { ChainInfos } from '../../config/config';
import type { ChainInfo } from '@keplr-wallet/types';
import { IChainList } from '../../interface/ChainList';

export const checkWallet = async (currChain: IChainList) => {
    if (!window.keplr || !window.getOfflineSigner) {
        console.log('Please install keplr extension');
    } else {
        const addChain = ChainInfos.find(
            (chain: ChainInfo) => chain.chainId === currChain.chainId,
        );
        if (addChain) {
            try {
                await window.keplr.experimentalSuggestChain(addChain);
            } catch (e) {
                console.error('Failed to suggest the chain');
            }
        }
    }

    await window.keplr.enable(currChain.chainId);

    const offlineSigner = window.getOfflineSigner(currChain.chainId);
    offlineSigner.signAmino = offlineSigner.signAmino || offlineSigner.sign;
    const accounts = await offlineSigner.getAccounts();

    return accounts[0];
};
