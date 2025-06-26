import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App, { AppFallback } from './App.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorBoundary } from '@sentry/react';

// Create a React Query client instance
// since async code runs fast, there is no point adding a loader, and so are retries
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

//   - usually I use Error boundaries to show fallback UIs if error cannot or should not be catched and handled preserving UI

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ErrorBoundary fallback={<AppFallback />}>
                <App />
            </ErrorBoundary>
        </QueryClientProvider>
    </StrictMode>,
);
