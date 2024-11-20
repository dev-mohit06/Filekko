// query-service.jsx
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from './api-client';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            cacheTime: 30 * 60 * 1000, // 30 minutes
            retry: 2,
            refetchOnWindowFocus: false,
        },
    },
});

export const QueryProvider = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

class QueryService {
    static #DEFAULT_CONFIG = {
        staleTime: 5 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,
        retry: 2,
    };

    static formatError(error) {
        return {
            message: error.message || 'An unexpected error occurred',
            status: error.status || 500,
            data: error.data || null,
        };
    }

    static createQueryKey(base, params = null) {
        const key = Array.isArray(base) ? base : [base];
        return params ? [...key, params] : key;
    }

    static useData(key, endpoint, params = null, config = {}) {
        const queryKey = this.createQueryKey(key, params);
        const finalConfig = { ...this.#DEFAULT_CONFIG, ...config };

        return useQuery({
            queryKey,
            queryFn: async () => {
                try {
                    const response = await apiClient.get(endpoint, { params });
                    return response;
                } catch (error) {
                    throw this.formatError(error);
                }
            },
            ...finalConfig,
        });
    }

    static useCreate(endpoint, config = {}) {
        return useMutation({
            mutationFn: async (data) => {
                try {
                    const response = await apiClient.post(endpoint, data);
                    return response;
                } catch (error) {
                    throw this.formatError(error);
                }
            },
            ...config,
        });
    }
}

export default QueryService;