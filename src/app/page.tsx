'use client';

import { useSession } from "next-auth/react"; // Hook pour gérer l'authentification et obtenir les données de session
import { useState } from "react"; // Hook pour gérer les états locaux
import { MdCancel } from "react-icons/md"; // Icône pour annuler la création d'une photo
import Image from "next/image"; // Composant pour gérer les images
import ImageUpload from "@/app/components/image-upload"; // Composant pour télécharger une image
import type { UploadedFileData } from "@/types/types"; // Type pour les données d'image téléchargée
import { api } from "@/trpc/react"; // API TRPC pour les appels serveur
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; // Hooks de React Query pour les requêtes et mutations

export default function Home() {
  // Récupère les données de session utilisateur
  const { data: session, status } = useSession();
  
  // Récupère les posts depuis l'API
  const { data: posts, isLoading, isError } = api.post.getPosts.useQuery();

  // États pour gérer les erreurs, l'image sélectionnée, et l'état du formulaire d'ajout
  const [erreur, setErreur] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<UploadedFileData | null>(null);
  const [openAddPicture, setOpenAddPicture] = useState<boolean>(false);

  // Mutation pour créer un post
  const createPost = api.post.createPost.useMutation();

  // Affiche les données de posts et session pour débogage
  console.log('GET POSTS : ', posts, isLoading, isError);
  console.log('GET SESSION : ', session, status);

  // Fonction pour ouvrir/fermer le formulaire d'ajout d'image
  const handleAddPicture = () => {
    if (session?.user) {
      setOpenAddPicture(!openAddPicture); // Bascule l'état d'ouverture du formulaire
    } else {
      setErreur("Vous devez vous connecter avant d'ajouter une image.");
      setTimeout(() => {
        setErreur(""); // Efface le message d'erreur après 5 secondes
      }, 5000);
    }
  };

  // Fonction appelée lorsque l'image est sélectionnée
  const onSelectedImage = (image: UploadedFileData | null) => {
    setSelectedImage(image);
    console.log('Image téléchargée : ', image); // Affiche les détails de l'image téléchargée
  };

  // Fonction pour soumettre le formulaire d'ajout de photo
  const handleSubmitPicture = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault(); // Empêche le rechargement de la page lors de la soumission

    // Vérifie si une image a été sélectionnée
    if (!selectedImage) {
      setErreur("Veuillez télécharger une image avant de soumettre le formulaire.");
      setTimeout(() => {
        setErreur(""); // Efface le message d'erreur après 5 secondes
      }, 5000);
      return;
    }

    try {
      // Envoie la mutation pour créer un nouveau post
      await createPost.mutateAsync({
        name: (e.currentTarget.titre as HTMLInputElement).value,
        image: selectedImage.url, // URL de l'image téléchargée
        description: (e.currentTarget.description as HTMLTextAreaElement).value,
      });
      setOpenAddPicture(false); // Ferme le formulaire après une soumission réussie
    } catch (error) {
      setErreur("Erreur lors de la création du post.");
      setTimeout(() => {
        setErreur(""); // Efface le message d'erreur après 5 secondes
      }, 5000);
    }
  };

  return (
    <main className="flex items-start justify-start p-3">
      <div className="w-[320px] hidden lg:block"></div>
      <section className="grow relative min-h-[97.5vh] flex items-start justify-center flex-wrap p-1 lg:p-8 lg:pr-16">
        <div className="mt-24 w-full flex items-center flex-wrap lg:flex-nowrap justify-between">
          <div className="mb-12">
            <h1 className="text-4xl font-semibold mb-2">Gallery</h1>
            <span className="text-[#ffffff79]">Community Gallery</span>
          </div>
          <div>
            <button onClick={handleAddPicture} className="bg-secondary w-full lg:w-fit lg:mx-0 mx-auto rounded-lg hover:px-6 duration-200 p-3">Add Picture</button>
          </div>
        </div>

        {isLoading ? (
          <p className="text-center">Chargement des posts...</p> // Affiche un message pendant le chargement des posts
        ) : isError ? (
          <p className="text-center">Erreur lors du chargement des posts.</p> // Affiche un message en cas d'erreur lors du chargement
        ) : (
          <>
            {posts && posts.length === 0 ? (
              <p className="text-center">Aucune image dans la galerie pour le moment ...</p> // Affiche un message si aucun post n'est trouvé
            ) : (
              <div className="gridy w-full">
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
                          src={ post.User?.image ?? "/icons/profile.png" }
                          alt={ post.User?.name ?? "utilisateur introuvable" }
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
              </div>
            )}
          </>
        )}
        {openAddPicture &&
          <div className="absolute flex items-center justify-center -top-4 -left-4 -right-4 -bottom-4 bg-[#000000a1]">
            <form onSubmit={handleSubmitPicture} className="bg-primary m-4 max-w-[1100px] p-4 relative rounded-lg flex items-center justify-center flex-wrap">
              <MdCancel onClick={handleAddPicture} className="absolute top-3 right-3 text-4xl shadow-xl hover:text-red-600 duration-200" />
              <h2 className="grow basis-full text-3xl font-semibold">Add Picture</h2>
              <p className="grow basis-full text-[#fafafa70] mt-2">share your moment with the community</p>
              <ImageUpload onUploadComplete={onSelectedImage} className="mt-6 w-full basis-full grow" />
              <div className="grow basis-full mt-2">
                <label htmlFor="titre" className="w-full block">Title</label>
                <input required className="p-3 text-black rounded-lg w-full mt-2 mb-5 outline outline-transparent focus:outline-secondary outline-offset-2 outline-2 duration-200" type="text" name="titre" id="titre" placeholder="Choisissez le titre de votre photo" />
              </div>
              <div className="grow basis-full my-2">
                <label htmlFor="description">Description</label>
                <textarea required className="p-3 text-black rounded-lg w-full mt-2 mb-5 outline outline-transparent focus:outline-secondary outline-offset-2 outline-2 h-52 duration-200" name="description" id="description" placeholder="Décrivez votre photo ici ..."></textarea>
              </div>
              <button type="submit" className="my-4 p-3 basis-full grow bg-secondary rounded-lg shadow-xl hover:bg-blue-600 duration-200">Ajouter une photo</button>
            </form>
          </div>
        }
        {erreur &&
          <p className="absolute bottom-0 left-0 right-0 p-4 rounded-lg bg-red-500 text-white text-center font-semibold">{erreur}</p>
        }
      </section>
    </main>
  );
}
