import React, { useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import { CHAIN_LIST_MAINNET, CHAIN_LIST_TESTNET } from '../../utils/constants';
import { store } from '../../store';

const AppChainList = () => {
    const { chain, setAccount } = useContext(store);

    return (
        <>
            {chain && (
                <Dropdown>
                    <Dropdown.Toggle variant="primary">
                        {chain.name}
                    </Dropdown.Toggle>

                    <Dropdown.Menu variant="dark">
                        {CHAIN_LIST_MAINNET.map((chain, i) => (
                            <Dropdown.Item
                                key={i}
                                onClick={() => setAccount(chain)}
                            >
                                {chain.name}
                            </Dropdown.Item>
                        ))}

                        <Dropdown.Divider />

                        {CHAIN_LIST_TESTNET.map((chain, i) => (
                            <Dropdown.Item
                                key={i}
                                onClick={() => setAccount(chain)}
                            >
                                {chain.name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            )}
        </>
    );
};

export default AppChainList;
