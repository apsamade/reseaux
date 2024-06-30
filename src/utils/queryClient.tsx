"use client"; // Indique que ce fichier est un composant côté client en Next.js

import { QueryClient } from '@tanstack/react-query'; // Import de la classe QueryClient de la bibliothèque React Query

// Création d'une instance de QueryClient pour gérer les requêtes et le cache
const queryClient = new QueryClient();

// Export de l'instance de QueryClient pour être utilisée dans le fournisseur de requêtes
export default queryClient;
