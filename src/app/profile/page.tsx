"use client";

import { useSession, signOut } from "next-auth/react";
import { api } from "@/trpc/react";
import Image from "next/image";

const Profile = () => {
    const { data: session, status } = useSession();

    // Vérifiez que la session est chargée et que l'utilisateur est connecté
    if (status === "loading") {
        return <p>Chargement en cours...</p>;
    }

    if (status !== "authenticated" || !session?.user?.id) {
        return <p>Veuillez vous connecter pour voir vos posts.</p>;
    }

    const userId = session.user.id;

    // Appelez la requête TRPC
    const { data: posts, isLoading, isError } = api.post.getUserPosts.useQuery({ userId });

    if (isLoading) return <p>Chargement des posts...</p>;
    if (isError) return <p>Erreur lors du chargement des posts</p>;

    return (
        <main className="flex items-start justify-start p-3">
            <div className="w-[320px] hidden lg:block"></div>
            <section className="grow relative lg:p-8 min-h-[97vh] xl:pr-16">
                <div>
                    <h1 className="text-4xl">Ma page Profile</h1>
                    <p className="mt-12">{session?.user?.email}</p>
                    <p>{session?.user?.name}</p>
                    <section className="gridy w-full mt-12 mb-24">
                        {posts?.map((post) => (
                            <div key={post.id} className="w-[300px] mx-auto h-[300px] z-0 overflow-hidden relative rounded-lg shadow-xl">
                                <Image
                                    src={post.image}
                                    alt={post.name}
                                    width={500}
                                    height={500}
                                    className="absolute w-full h-full -z-10 top-0 left-0 right-0 bottom-0 rounded-lg mb-2 object-cover"
                                />
                                <div className="absolute overflow-hidden opacity-0 hover:opacity-100 duration-200 z-10 top-0 left-0 right-0 bottom-0 flex justify-between flex-col">
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
                <button
                    onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
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
