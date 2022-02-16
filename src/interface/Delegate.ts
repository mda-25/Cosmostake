export interface IDelegatedProps {
    delegate: {
        delegation: {
            delegator_address: string;
            shares: string;
            validator_address: string;
        };
        balance: any;
    };
}
