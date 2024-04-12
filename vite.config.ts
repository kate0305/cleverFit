import path from 'path';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
    base: command === 'build' ? '/kate0305/' : '/',
    plugins: [react()],
    server: {
        host: true,
        port: 3000,
    },
    resolve: {
        alias: {
            '@public': path.resolve(__dirname, 'public'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@constants': path.resolve(__dirname, 'src/constants'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@redux': path.resolve(__dirname, 'src/redux'),
            '@sass': path.resolve(__dirname, 'src/sass'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@type': path.resolve(__dirname, 'src/types'),
            '@utils': path.resolve(__dirname, 'src/utils'),
        },
    },
}));
