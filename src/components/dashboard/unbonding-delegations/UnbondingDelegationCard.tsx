import React from 'react';
import { Card } from '../../styled/Card';
import BtnCopy from '../../BtnCopy';
import {
    ellipsis,
    formatDate,
    formatMinimalDenomToCoinDenom,
} from '../../../utils/helpers';
import styled from 'styled-components';

interface IUnbDelegProps {
    data: {
        delegator_address?: string;
        validator_address: string;
        entries: {
            completion_time: string;
            balance: string;
        }[];
    };
}

const WrapperEntries = styled.div`
    display: grid;
    grid-gap: 10px;
`;

const UnbondingDelegationCard = ({ data }: IUnbDelegProps) => {
    return (
        <Card>
            <Card.Header as="h5">Unbonding delegation</Card.Header>
            <Card.Body>
                <Card.Title>
                    Validator: {ellipsis(data.validator_address)}
                    <BtnCopy textToCopy={data.validator_address} />
                </Card.Title>

                <WrapperEntries>
                    {data.entries.map((elem, i) => (
                        <div key={i}>
                            <span>
                                Balance:{' '}
                                {formatMinimalDenomToCoinDenom(elem.balance)}
                            </span>
                            <div>
                                (will be credited:{' '}
                                {formatDate(elem.completion_time)})
                            </div>
                        </div>
                    ))}
                </WrapperEntries>
            </Card.Body>
        </Card>
    );
};

export default UnbondingDelegationCard;
