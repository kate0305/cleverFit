import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@redux/configure-store';
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.variable.css';
import { App } from '@pages/routes';
import 'normalize.css';
import './index.css';

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
