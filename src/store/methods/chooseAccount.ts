import { IChainList } from '../../interface/ChainList';
import { ChainInfos } from '../../config/config';
import { ChainInfo } from '@keplr-wallet/types';
import { toast } from 'react-toastify';

export const chooseAccount = async (currChain: IChainList) => {
    if (!window.keplr || !window.getOfflineSigner) {
        toast.error('Install keplr wallet');
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

        await window.keplr.enable(currChain.chainId);

        const offlineSigner = window.getOfflineSigner(currChain.chainId);
        offlineSigner.signAmino = offlineSigner.signAmino || offlineSigner.sign;
        const accounts = await offlineSigner.getAccounts();

        return accounts[0];
    }
};
