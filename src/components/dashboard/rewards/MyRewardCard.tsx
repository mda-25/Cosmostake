import React, { useContext } from 'react';
import { Card } from '../../styled/Card';
import {
    ellipsis,
    formatMinimalDenomToCoinDenom,
} from '../../../utils/helpers';
import { Button } from 'react-bootstrap';
import { store } from '../../../store';

interface IRewardsProps {
    data: any;
    handleClaim(validator: string): void;
}

const MyRewardCard = ({ data, handleClaim }: IRewardsProps) => {
    const { chain } = useContext(store);

    const claim = () => {
        handleClaim(data.validator_address);
    };
    return (
        <Card>
            <Card.Header as="h5">Reward</Card.Header>
            <Card.Body>
                <Card.Title>
                    Validator: {ellipsis(data.validator_address, 15, -5)}
                </Card.Title>

                <Card.Text>
                    Rewards:{' '}
                    {data.reward
                        ? formatMinimalDenomToCoinDenom(
                              data.reward[0].amount,
                              chain.coinDenom,
                          )
                        : '0'}
                </Card.Text>

                <Button variant="primary" onClick={claim}>
                    Claim
                </Button>
            </Card.Body>
        </Card>
    );
};

export default MyRewardCard;
