import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

interface IRoute {
    path: string;
    name: string;
    exact: boolean;
    component: any;
    props?: any;
}

export const routes: IRoute[] = [
    {
        path: '/',
        name: 'Home',
        exact: true,
        component: Home,
    },
    {
        path: '*',
        name: 'Not Found',
        exact: false,
        component: NotFound,
    },
];
