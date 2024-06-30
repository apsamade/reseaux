import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/utils/queryClient';

const ReactQueryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default ReactQueryProvider;