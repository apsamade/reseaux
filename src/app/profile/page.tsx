"use client";

import { useSession, signOut } from "next-auth/react"; // Import des hooks de gestion de session et de déconnexion
import { api } from "@/trpc/react"; // Import des appels API via TRPC
import Image from "next/image"; // Import du composant Image de Next.js pour les images optimisées

const Profile = () => {
    const { data: session, status } = useSession(); // Récupère les données de session et le statut de la connexion

    // Vérifie si la session est en cours de chargement
    if (status === "loading") {
        return <p>Chargement en cours...</p>; // Affiche un message pendant le chargement des données de session
    }

    // Vérifie si l'utilisateur n'est pas authentifié ou si les informations de session sont manquantes
    if (status !== "authenticated" || !session?.user?.id) {
        return <p>Veuillez vous connecter pour voir vos posts.</p>; // Affiche un message demandant à se connecter si l'utilisateur n'est pas authentifié
    }

    const userId = session.user.id; // Récupère l'ID de l'utilisateur à partir de la session

    // Appelle la requête TRPC pour obtenir les posts de l'utilisateur
    const { data: posts, isLoading, isError } = api.post.getUserPosts.useQuery({ userId });

    // Affiche des messages de chargement ou d'erreur en fonction de l'état de la requête
    if (isLoading) return <p>Chargement des posts...</p>; // Affiche un message pendant le chargement des posts
    if (isError) return <p>Erreur lors du chargement des posts</p>; // Affiche un message en cas d'erreur lors du chargement des posts

    return (
        <main className="flex items-start justify-start p-3">
            {/* Espace réservé pour le design responsive */}
            <div className="w-[320px] hidden lg:block"></div>
            <section className="grow relative lg:p-8 min-h-[97vh] xl:pr-16">
                <div>
                    <h1 className="text-4xl">Ma page Profile</h1> {/* Titre de la page */}
                    <p className="mt-12">{session?.user?.email}</p> {/* Affiche l'email de l'utilisateur */}
                    <p>{session?.user?.name}</p> {/* Affiche le nom de l'utilisateur */}
                    <section className="gridy w-full mt-12 mb-24">
                        {posts?.map((post) => (
                            <div key={post.id} className="w-[300px] mx-auto h-[300px] z-0 overflow-hidden relative rounded-lg shadow-xl">
                                {/* Conteneur pour chaque post */}
                                <Image
                                    src={post.image}
                                    alt={post.name}
                                    width={500}
                                    height={500}
                                    className="absolute w-full h-full -z-10 top-0 left-0 right-0 bottom-0 rounded-lg mb-2 object-cover"
                                />
                                <div className="absolute overflow-hidden opacity-0 hover:opacity-100 duration-200 z-10 top-0 left-0 right-0 bottom-0 flex justify-between flex-col">
                                    {/* Conteneur pour les détails du post, visible au survol */}
                                    <h3 className="p-2 flex items-center justify-start pb-8 bg-gradient-to-b from-[#000000a8] to-transparent">
                                        <Image
                                            src={post.User?.image ?? "/icons/profile.png"}
                                            alt={post.User?.name ?? "utilisateur introuvable"}
                                            width={35}
                                            height={35}
                                            className="rounded-full mr-2"
                                        />
                                        {post.User?.name ?? 'Utilisateur inconnu'}
                                    </h3>
                                    <div className="p-2 pt-8 bg-gradient-to-t from-[#000000a8] to-transparent">
                                        <h2 className="text-xl font-semibold mb-2">{post.name}</h2>
                                        <p className="truncate w-full inline-block">{post.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}                        
                    </section>
                </div>
                {/* Bouton de déconnexion */}
                <button
                    onClick={() => signOut({ redirect: true, callbackUrl: '/' })} // Déconnexion et redirection vers la page d'accueil
                    className="text-center mx-auto absolute bottom-0 left-0 right-0 w-[325px] block mb-auto lg:min-w-[325px] shadow-2xl p-4 px-12 hover:px-16 hover:bg-red-700 duration-200 bg-red-500 rounded-lg"
                    type="button"
                >
                    Déconnexion
                </button>
            </section>
        </main>
    );
};

export default Profile;
