"use client"

import { signIn } from 'next-auth/react';
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

const ButtonGoogle: React.FC<{ type: string }> = ({ type }) => {
    const [erreur, setErreur] = useState<string>("");

    const Search: React.FC = () => {
        const searchParams = useSearchParams();
        const err = searchParams.get('error');
        useEffect(() => {
            if (err) setErreur('Une erreur est survenue lors de la connexion');
        }, [err]);
        return null;
    };

    const handleConnect = async () => {
        try {
            await signIn("google", { callbackUrl: '/', redirect: false });
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
        }
    };

    return (
        <>
            <button
                className='bg-accent duration-300 hover:bg-green-50 hover:text-black text-white p-3 m-1 shadow-lg rounded-lg w-full'
                type="button"
                onClick={handleConnect}
            >
                {type}
            </button>
            <Suspense>
                <Search />
            </Suspense>
            {erreur && <p className="text-red-500 mt-2 p-3">{erreur}</p>}
        </>
    );
};

export default ButtonGoogle;
