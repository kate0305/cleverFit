/* eslint-disable simple-import-sort/imports */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { store } from '@redux/configure-store';

import 'antd/dist/antd.variable.css';

import { App } from '@pages/routes';

import './index.css';
import 'normalize.css';

ConfigProvider.config({
    theme: {
        primaryColor: '#2f54eb',
        infoColor: '#597EF7',
    },
});

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
);
