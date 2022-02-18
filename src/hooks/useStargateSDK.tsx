import { coin, SigningStargateClient, StdFee } from '@cosmjs/stargate';
import { useCallback, useMemo, useState } from 'react';
import { IChainList } from '../interface/ChainList';
import toastrHandle from '../utils/toastrHandle';
import { toast } from 'react-toastify';

export interface IOption {
    from: string;
    to: string;
    amount: number;
    denom: string;
}

export interface IRedelegate {
    delegator: string;
    validatorFrom: string;
    validatorTo: string;
    amount: number;
    denom: string;
}

type TClaimProps = {
    delegate: string;
    validator: string;
};

const handleErr = (resp: any) => {
    if (resp.code === 0) {
        toast.success('Success!');
    } else {
        throw resp.rawLog;
    }
};

const useStargateSDK = (chain: IChainList) => {
    const [isLoading, setLoading] = useState<boolean>(false);

    // const gas_limit = '80000';
    const gas_limit = useMemo(
        () => (chain?.chainId === 'cosmoshub-testnet' ? '200000' : '80000'),
        [chain],
    );
    const fee: StdFee = {
        amount: [coin(1, 'uatom')],
        gas: gas_limit,
    };

    const client = useCallback(async (): Promise<SigningStargateClient> => {
        const offlineSigner = window.getOfflineSigner(chain.chainId);
        offlineSigner.signAmino = offlineSigner.signAmino || offlineSigner.sign;

        return await SigningStargateClient.connectWithSigner(
            chain.rpc,
            offlineSigner,
        );
    }, [chain]);

    const Delegate = async ({ from, to, amount, denom }: IOption) => {
        const rpc = await client();
        try {
            setLoading(true);

            const resp = await toastrHandle(
                rpc.delegateTokens(
                    from,
                    to,
                    coin(Math.floor(amount), denom),
                    fee,
                ),
            );

            handleErr(resp);
        } catch (e: any) {
            toast.error(e);
        } finally {
            setLoading(false);
        }
    };

    const Undelegate = async ({ from, to, amount, denom }: IOption) => {
        const rpc = await client();
        try {
            setLoading(true);
            const resp = await toastrHandle(
                rpc.undelegateTokens(
                    from,
                    to,
                    coin(Math.floor(amount), denom),
                    fee,
                ),
            );

            handleErr(resp);
        } catch (e: any) {
            toast.error(e);
        } finally {
            setLoading(false);
        }
    };

    const Claim = async ({ delegate, validator }: TClaimProps) => {
        const rpc = await client();

        try {
            setLoading(true);
            const resp = await toastrHandle(
                rpc.withdrawRewards(delegate, validator, fee),
            );

            handleErr(resp);
        } catch (e: any) {
            toast.error(e);
        } finally {
            setLoading(false);
        }
    };

    const Redelegate = async ({
        delegator,
        validatorFrom,
        validatorTo,
        amount,
        denom,
    }: IRedelegate) => {
        const rpc = await client();

        const msg = {
            typeUrl: '/cosmos.staking.v1beta1.MsgBeginRedelegate',
            value: {
                delegatorAddress: delegator,
                validatorSrcAddress: validatorFrom,
                validatorDstAddress: validatorTo,
                amount: coin(amount, denom),
            },
        };

        try {
            setLoading(true);

            const resp = await toastrHandle(
                rpc.signAndBroadcast(
                    'cosmos17ht88wh672df3r4eqh7qvtpnq692hh5ngy24qc',
                    [msg],
                    fee,
                ),
            );

            handleErr(resp);
        } catch (e: any) {
            toast.error(e);
        } finally {
            setLoading(false);
        }
    };

    // const Delegate = async ({ from, to, amount, denom }: IOption) => {
    //     const rpc = await client();
    //     const msg = {
    //         typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
    //         value: {
    //             delegatorAddress: from,
    //             validatorAddress: to,
    //             amount: coin(Math.floor(amount), denom),
    //         },
    //     };
    //
    //     const resp = await rpc.signAndBroadcast(from, [msg], fee);
    //     console.log(resp);
    // };

    return {
        isLoading,
        Delegate,
        Undelegate,
        Claim,
        Redelegate,
    };
};

export default useStargateSDK;
