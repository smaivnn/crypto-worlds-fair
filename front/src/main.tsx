import './App.css';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient.ts';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App.tsx';

// react-query 설정
const root = createRoot(document.getElementById('root')!);
root.render(
    <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>,
);
