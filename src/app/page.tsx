'use client';

import { useSession } from "next-auth/react";
import { useState } from "react";
import ImageUpload from "@/app/components/image-upload";
import { MdCancel } from "react-icons/md";
import type { UploadedFileData } from "@/types/types";
import { api } from "@/trpc/react"; // Assurez-vous que ceci est bien configuré

export default function Home() {
  const { data: session } = useSession();
  const [erreur, setErreur] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<UploadedFileData | null>(null);
  const [openAddPicture, setOpenAddPicture] = useState<boolean>(false);

  const createPost = api.post.createPost.useMutation();

  const handleAddPicture = () => {
    if (session?.user) {
      setOpenAddPicture(!openAddPicture);
    } else {
      setErreur("Vous devez vous connecter avant d'ajouter une image.");
      setTimeout(() => {
        setErreur("");
      }, 5000);
    }
  };

  const onSelectedImage = (image: UploadedFileData | null) => {
    setSelectedImage(image);
    console.log('Image téléchargée : ', image);
  };

  const handleSubmitPicture = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!selectedImage) {
      setErreur("Veuillez télécharger une image avant de soumettre le formulaire.");
      setTimeout(() => {
        setErreur("");
      }, 5000);
      return;
    }

    try {
      await createPost.mutateAsync({
        name: (e.currentTarget.titre as HTMLInputElement).value,
        image: selectedImage.url, // Assurez-vous que vous avez bien l'URL de l'image
        description: (e.currentTarget.description as HTMLTextAreaElement).value,
      });
      setOpenAddPicture(false);
    } catch (error) {
      setErreur("Erreur lors de la création du post.");
      setTimeout(() => {
        setErreur("");
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
        <p className="text-center">Aucune image dans la gallery pour le moment ...</p>

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
