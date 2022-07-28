import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { App } from './app/app';

const root = ReactDOMClient.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <BrowserRouter>
        <StrictMode>
            <SnackbarProvider maxSnack={3}>
                <App />
            </SnackbarProvider>
        </StrictMode>
    </BrowserRouter>
);
