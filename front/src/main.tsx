import './App.css';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient.ts';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App.tsx';

const attachRuntimeErrorOverlay = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const ensureOverlay = () => {
        let overlay = document.getElementById('runtime-error-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'runtime-error-overlay';
            overlay.style.position = 'fixed';
            overlay.style.inset = '0';
            overlay.style.zIndex = '99999';
            overlay.style.background = 'rgba(10, 10, 10, 0.92)';
            overlay.style.color = '#f8f8f8';
            overlay.style.fontFamily =
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
            overlay.style.fontSize = '12px';
            overlay.style.padding = '16px';
            overlay.style.overflow = 'auto';
            overlay.style.whiteSpace = 'pre-wrap';
            overlay.style.display = 'none';
            document.body.appendChild(overlay);
        }
        return overlay;
    };

    const showOverlay = (title: string, details: string) => {
        const overlay = ensureOverlay();
        if (!overlay) return;
        overlay.textContent = `[${new Date().toISOString()}] ${title}\n\n${details}`;
        overlay.style.display = 'block';
    };

    window.addEventListener('error', (event) => {
        const details = [
            event.message,
            event.filename ? `File: ${event.filename}` : '',
            event.lineno ? `Line: ${event.lineno}` : '',
            event.colno ? `Col: ${event.colno}` : '',
            event.error?.stack ? `Stack:\n${event.error.stack}` : '',
        ]
            .filter(Boolean)
            .join('\n');
        showOverlay('Runtime Error', details);
    });

    window.addEventListener('unhandledrejection', (event) => {
        const reason =
            event.reason instanceof Error
                ? event.reason.stack || event.reason.message
                : String(event.reason);
        showOverlay('Unhandled Promise Rejection', reason);
    });
};

attachRuntimeErrorOverlay();

// react-query 설정
const root = createRoot(document.getElementById('root')!);
root.render(
    <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>,
);
