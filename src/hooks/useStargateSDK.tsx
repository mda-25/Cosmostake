import { coin, SigningStargateClient, StdFee } from '@cosmjs/stargate';
import { useCallback, useState } from 'react';
import { IChainList } from '../interface/ChainList';

export interface IOption {
    from: string;
    to: string;
    amount: number;
    denom: string;
}

type TClaimProps = {
    delegate: string;
    validator: string;
};

const useStargateSDK = (chain: IChainList) => {
    const [isLoading, setLoading] = useState<boolean>(false);

    const client = useCallback(async (): Promise<SigningStargateClient> => {
        window.keplr.enable(chain.chainId);

        const offlineSigner = window.getOfflineSigner(chain.chainId);
        offlineSigner.signAmino = offlineSigner.signAmino || offlineSigner.sign;

        return await SigningStargateClient.connectWithSigner(
            chain.rpc,
            offlineSigner,
        );
    }, [chain]);

    const gas_limit = '200000';
    const fee: StdFee = {
        amount: [coin(1, 'uatom')],
        gas: gas_limit,
    };

    const Delegate = async ({ from, to, amount, denom }: IOption) => {
        const rpc = await client();
        try {
            setLoading(true);
            await rpc.delegateTokens(from, to, coin(amount, denom), fee);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const Undelegate = async ({ from, to, amount, denom }: IOption) => {
        const rpc = await client();
        try {
            setLoading(true);
            await rpc.undelegateTokens(from, to, coin(amount, denom), fee);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const Claim = async ({ delegate, validator }: TClaimProps) => {
        const rpc = await client();

        try {
            setLoading(true);
            await rpc.withdrawRewards(delegate, validator, fee);
        } catch (e: any) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return {
        isLoading,
        Delegate,
        Undelegate,
        Claim,
    };
};

export default useStargateSDK;
