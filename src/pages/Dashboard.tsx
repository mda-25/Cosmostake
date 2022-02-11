import React from 'react';
import Delegations from '../components/dashboard/delegations/Delegations';
import { Tab, Tabs as BTabs } from 'react-bootstrap';
import styled from 'styled-components';
import Rewards from '../components/dashboard/rewards/Rewards';
import UnbondingDelegations from '../components/dashboard/unbonding-delegations/UnbondingDelegations';

const Tabs = styled(BTabs)`
    margin-bottom: 20px;
    .nav-link {
        color: ${({ theme }) => theme.white};
        font-weight: 500;
        font-size: ${({ theme }) => theme.fs18};

        &.active {
            background-color: ${({ theme }) => theme.blue.b30};
        }

        &:hover {
            background-color: ${({ theme }) => theme.blue.b20};
            color: ${({ theme }) => theme.blue.b70};
        }
    }
`;

const Dashboard = () => {
    return (
        <div>
            <Tabs defaultActiveKey="delegation" id="uncontrolled-tab-example">
                <Tab eventKey="delegation" title="My delegation">
                    <Delegations />
                </Tab>
                <Tab eventKey="rewards" title="My rewards">
                    <Rewards />
                </Tab>
                <Tab eventKey="unbonding" title="Unbonding delegations">
                    <UnbondingDelegations />
                </Tab>
            </Tabs>
        </div>
    );
};

export default Dashboard;
