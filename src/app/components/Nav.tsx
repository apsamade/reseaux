'use client'

import Link from "next/link"
import Image from "next/image"
import ButtonGoogle from "@/app/components/ButtonGoogle"
import { AiOutlineMenu } from "react-icons/ai"
import { useSession } from "next-auth/react"
import { useState } from "react"

// Composant de navigation (navbar)
const Nav = () => {
    const { data: session, status } = useSession(); // Hook pour obtenir les informations de session et son état
    const [openMenu, setOpenMenu] = useState<boolean>(false); // État pour gérer l'ouverture/fermeture du menu

    // Fonction pour basculer l'état du menu
    const handleNav = () => {
        setOpenMenu(!openMenu);
    }

    return (
        <>
            {/* Navbar responsive */}
            <nav className={!openMenu ? 
                "lg:flex flex-wrap hidden z-50 items-end justify-center fixed top-0 left-0 bottom-0 m-3 bg-primary w-[300px] rounded-lg p-3" : 
                "flex z-50 flex-wrap items-end justify-center fixed top-0 right-0 bottom-0 m-3 bg-primary w-[300px] rounded-lg p-3"}>
                {/* Liens de navigation */}
                <div className="w-full mt-12 basis-full">
                    <Link 
                        className="p-3 hover:bg-white hover:text-black duration-200 rounded-lg text-center mb-5 bg-secondary basis-full block w-full" 
                        href="/">Community
                    </Link>
                    <Link 
                        className="py-2 border-b border-transparent duration-200 hover:border-white text-center w-fit mx-auto px-6 block" 
                        href="/">My Store
                    </Link>
                </div>
                {/* Affichage du statut de la session */}
                {status === 'loading' && (
                    <p className='bg-fond p-4 rounded-md'>loading ...</p> // Affiche un message de chargement pendant le chargement de la session
                )}
                {status === 'authenticated' && session?.user && (
                    <Link
                        href='/profile'
                        className="flex items-center justify-center"
                    >
                        <Image
                            src={session.user.image ?? ''} // Affiche l'image de profil de l'utilisateur s'il est authentifié
                            alt='Photo de profil'
                            width={50}
                            height={50}
                            className='block hover:scale-110 duration-200 rounded-[100%] mr-2'
                        />
                        <span className="truncate w-full inline-block">{session.user.name}</span> {/* Affiche le nom de l'utilisateur */}
                    </Link>
                )}
                {status === 'unauthenticated' && (
                    <ButtonGoogle type="Sign In" /> // Affiche le bouton de connexion si l'utilisateur n'est pas authentifié
                )}
            </nav>
            {/* Menu burger pour les écrans petits */}
            <div
                onClick={handleNav} // Basculer l'état du menu lors du clic
                className='fixed z-50 top-3 hover:px-6 duration-200 right-3 lg:hidden cursor-pointer p-1'
            >
                <AiOutlineMenu size={45} className='text-sky-300' /> {/* Icône de menu burger */}
            </div>
        </>
    )
}

export default Nav
