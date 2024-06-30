import { QueryClientProvider } from '@tanstack/react-query'; // Import du fournisseur de contexte pour React Query
import queryClient from '@/utils/queryClient'; // Import de l'instance de client Query

// Composant ReactQueryProvider pour envelopper l'application avec le QueryClientProvider
const ReactQueryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}> {/* Fournit le client React Query à l'application */}
            {children} {/* Rendu des composants enfants */}
        </QueryClientProvider>
    );
};

export default ReactQueryProvider; // Exporte le composant comme exportation par défaut
