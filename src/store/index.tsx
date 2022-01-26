import React, {
    createContext,
    FC,
    useCallback,
    useEffect,
    useMemo,
    useReducer,
} from 'react';

type ActionType = {
    type: string;
    payload: any;
};

interface IAppContext {
    state: any;
}

const initialState: any = {
    chain: '',
};

const reducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case 'SET_CHAIN':
            return { ...state, chain: action.payload };
        case 'SET_ACCOUNT':
            return { ...state, account: action.payload };
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

    const setAccount = useCallback(async (chain?: any) => {
        if (chain) {
            dispatch({ type: 'SET_CHAIN', payload: chain });
        }
        const chainId = chain ? chain.node : 'cosmoshub';

        await window.keplr.enable(chainId);

        const offlineSigner = window.getOfflineSigner(chainId);

        const resp = await offlineSigner.getAccounts();
        dispatch({ type: 'SET_ACCOUNT', payload: resp[0] });
    }, []);

    useEffect(() => {
        if (!window.keplr || !window.getOfflineSigner) {
            console.log('Please install keplr extension');
        } else {
            setAccount();
            dispatch({
                type: 'SET_CHAIN',
                payload: { name: 'cosmos', node: 'cosmoshub' },
            });
        }
    }, []);

    const provider = useMemo(() => {
        return {
            ...state,
            setAccount,
        };
    }, [state]);

    return <Provider value={provider}>{children}</Provider>;
};

export { store, StoreProvider };
