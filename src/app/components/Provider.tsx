'use client';

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
    return (
        <SessionProvider session={null}>
            {children}
        </SessionProvider>
    );
}

export default Provider;
