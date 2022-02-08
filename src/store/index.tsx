import React, {
    createContext,
    FC,
    useEffect,
    useMemo,
    useReducer,
} from 'react';
import { CHAIN_LIST_MAINNET } from '../utils/constants';
import { checkWallet } from './methods/checkWallet';
import { IChainList } from '../interface/ChainList';

type ActionType = {
    type: string;
    payload: any;
};

interface IInitialState {
    chain: IChainList;
    account?: any;
}

const initialState: IInitialState = {
    chain: CHAIN_LIST_MAINNET[0],
};

const reducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case 'SET_CHAIN':
            return { ...state, chain: action.payload };
        case 'SET_ACCOUNT':
            return { ...state, account: action.payload };
        case 'SET_BALANCE':
            return { ...state, balance: action.payload };
        default:
            return state;
    }
};

const store = createContext<any>({
    state: initialState,
});

const { Provider } = store;

const StoreProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setChain = (chain: IChainList) => {
        const localStoreChain = localStorage.getItem('chain');

        if (chain) {
            checkWallet(chain);

            localStorage.setItem('chain', JSON.stringify(chain));
            dispatch({ type: 'SET_CHAIN', payload: chain });
        } else if (typeof localStoreChain === 'string') {
            const locChain = JSON.parse(localStoreChain);
            dispatch({ type: 'SET_CHAIN', payload: locChain });
        }
    };

    const setBalance = async (
        address: string,
        handleBalance: (address: string) => Promise<any>,
    ) => {
        const bal = await handleBalance(address);

        dispatch({
            type: 'SET_BALANCE',
            payload: bal.result[0],
        });
    };

    const setAccount = async (chain: IChainList) => {
        setChain(chain);

        const account = await checkWallet(chain);

        dispatch({ type: 'SET_ACCOUNT', payload: account });
    };

    useEffect(() => {
        const localStoreChain = localStorage.getItem('chain');

        if (typeof localStoreChain === 'string') {
            const localChain = JSON.parse(localStoreChain);
            setAccount(localChain);
        } else {
            localStorage.setItem('chain', JSON.stringify(state.chain));
            const localStoreChain = localStorage.getItem('chain');

            if (typeof localStoreChain === 'string') {
                setAccount(JSON.parse(localStoreChain));
            }
        }
    }, []);

    const provider = useMemo(() => {
        return {
            ...state,
            dispatch,
            setAccount,
            setBalance,
        };
    }, [state]);

    return <Provider value={provider}>{children}</Provider>;
};

export { store, StoreProvider };
