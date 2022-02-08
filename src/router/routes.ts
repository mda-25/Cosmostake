import NotFound from '../pages/NotFound';
import Dashboard from '../pages/Dashboard';
import Stake from '../pages/Stake';

export interface IRoute {
    path: string;
    name: string;
    exact: boolean;
    component: any;
    props?: any;
}

export const routes: IRoute[] = [
    {
        path: '/stake',
        name: 'Stake',
        exact: true,
        component: Stake,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        exact: true,
        component: Dashboard,
    },
    {
        path: '*',
        name: 'Not Found',
        exact: false,
        component: NotFound,
    },
];
