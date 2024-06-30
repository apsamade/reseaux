'use client';

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

// Composant Provider pour envelopper l'application avec le SessionProvider de NextAuth
const Provider = ({ children }: { children: ReactNode }) => {
    return (
        <SessionProvider session={null}> {/* Fournit le contexte de session pour NextAuth */}
            {children} {/* Rendu des composants enfants */}
        </SessionProvider>
    );
}

export default Provider;
