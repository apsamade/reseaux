"use client"

import { signIn } from 'next-auth/react';
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

// Composant bouton de connexion avec Google
const ButtonGoogle: React.FC<{ type: string }> = ({ type }) => {
    // État pour stocker les messages d'erreur
    const [erreur, setErreur] = useState<string>("");

    // Composant interne pour gérer les paramètres de recherche dans l'URL
    const Search: React.FC = () => {
        const searchParams = useSearchParams(); // Accède aux paramètres de recherche de l'URL
        const err = searchParams.get('error'); // Récupère le paramètre 'error' de l'URL

        // Met à jour l'état d'erreur si le paramètre 'error' est présent
        useEffect(() => {
            if (err) setErreur('Une erreur est survenue lors de la connexion');
        }, [err]);

        return null; // Pas de rendu nécessaire pour ce composant
    };

    // Fonction pour gérer la connexion avec Google
    const handleConnect = async () => {
        try {
            // Tente de se connecter avec Google, sans redirection automatique
            await signIn("google", { callbackUrl: '/', redirect: false });
        } catch (error) {
            console.error('Erreur lors de la connexion:', error); // Affiche l'erreur en cas d'échec
        }
    };

    return (
        <>
            <button
                className='bg-accent duration-300 hover:bg-green-50 hover:text-black text-white p-3 m-1 shadow-lg rounded-lg w-full'
                type="button"
                onClick={handleConnect} // Appelle handleConnect lors du clic
            >
                {type} {/* Affiche le texte du bouton */}
            </button>
            <Suspense>
                <Search /> {/* Affiche le composant Search */}
            </Suspense>
            {/* Affiche un message d'erreur si présent */}
            {erreur && <p className="text-red-500 mt-2 p-3">{erreur}</p>}
        </>
    );
};

export default ButtonGoogle;
