import React from 'react';
// if it will be deployed on the server, change the hashroute on the browser route
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../styled/GlobalStyles';
import { Normalize } from 'styled-normalize';
import theme from '../../utils/theme';
import { StoreProvider } from '../../store';
import LayoutDefault from '../../layouts/LayoutDefault';
import Toastr from '../styled/Toastr';

function App() {
    return (
        <Router>
            <StoreProvider>
                <Normalize />
                <ThemeProvider theme={theme}>
                    <GlobalStyles />
                    <LayoutDefault />
                    <Toastr
                        position="top-right"
                        autoClose={4000}
                        hideProgressBar={true}
                        closeOnClick
                        pauseOnHover={false}
                        draggable={false}
                    />
                </ThemeProvider>
            </StoreProvider>
        </Router>
    );
}

export default App;
