import React, { createContext, FC, useMemo, useState } from 'react';
import { CHAIN_LIST_MAINNET } from '../utils/constants';
import { chooseAccount } from './methods/chooseAccount';
import { IChainList } from '../interface/ChainList';

interface IInitialState {
    chain?: IChainList;
    account?: any;
}

const initialState: IInitialState = {};

const store = createContext<any>({
    state: initialState,
});

const { Provider } = store;

const StoreProvider: FC = ({ children }) => {
    const [chain, setChain] = useState<IChainList>();
    const [account, setAcc] = useState();
    const [balance, setBal] = useState();

    const setBalance = async (
        address: string,
        handleBalance: (address: string) => Promise<any>,
    ) => {
        try {
            const bal = await handleBalance(address);

            setBal(bal.data.result[0]);
        } catch (e: any) {
            console.error(e);
        }
    };

    const setAccount = async (chain: IChainList) => {
        localStorage.setItem('chain', JSON.stringify(chain));

        setChain(chain);

        const account = await chooseAccount(chain);
        setAcc(account);
    };

    window.onload = async () => {
        const localStoreChain = localStorage.getItem('chain');
        if (typeof localStoreChain === 'string') {
            const localChain = JSON.parse(localStoreChain);
            await setAccount(localChain);
        } else {
            await setAccount(CHAIN_LIST_MAINNET[0]);
        }
    };

    const provider = useMemo(() => {
        return {
            setAccount,
            setBalance,
            chain,
            account,
            balance,
        };
    }, [chain, account, balance]);

    return <Provider value={provider}>{children}</Provider>;
};

export { store, StoreProvider };
