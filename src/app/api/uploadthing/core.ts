import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

// Crée une instance de Uploadthing pour gérer les uploads de fichiers
const f = createUploadthing();

// Fonction d'authentification fictive pour le middleware
// Remplacez cette fonction par une véritable logique d'authentification
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// Définition du routeur de fichiers pour la gestion des uploads
export const ourFileRouter = {
    // Route pour uploader des images
    imageUploader: f({ image: { maxFileSize: "4MB" } })
        // Middleware pour vérifier l'authentification de l'utilisateur
        .middleware(async ({ req }) => {
            const user = auth(req); // Authentifie l'utilisateur à partir de la requête

            if (!user) throw new UploadThingError("Unauthorized"); // Lève une erreur si non authentifié
            return { userId: user.id }; // Passe l'ID de l'utilisateur au handler d'upload
        })
        // Callback appelé après la fin de l'upload
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete for userId:", metadata.userId); // Log de l'ID utilisateur
            console.log("file url", file.url); // Log de l'URL du fichier uploadé

            return { uploadedBy: metadata.userId }; // Retourne l'ID de l'utilisateur qui a uploadé le fichier
        }),
} satisfies FileRouter; // S'assure que ourFileRouter respecte le type FileRouter

// Définit le type de notre routeur de fichiers
export type OurFileRouter = typeof ourFileRouter;
