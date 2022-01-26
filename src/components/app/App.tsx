import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../styled/GlobalStyles';
import { Normalize } from 'styled-normalize';
import theme from '../../utils/theme';
import '../../assets/scss/index.scss';
import { StoreProvider } from '../../store';
import LayoutDefault from '../../layouts/LayoutDefault';

function App() {
    return (
        <Router>
            <StoreProvider>
                <Normalize />
                <ThemeProvider theme={theme}>
                    <GlobalStyles />
                    <LayoutDefault />
                </ThemeProvider>
            </StoreProvider>
        </Router>
    );
}

export default App;
