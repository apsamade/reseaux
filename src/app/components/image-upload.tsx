'use client'

import { UploadDropzone } from "@/utils/uploadthing";
import type { UploadedFileData } from "@/types/types";

// Définition des propriétés acceptées par le composant ImageUpload
interface ImageUploadProps {
    className?: string; // Classe CSS optionnelle pour le conteneur
    onUploadComplete: (image: UploadedFileData | null) => void; // Fonction de rappel lorsque l'upload est terminé
}

// Composant pour uploader des images
const ImageUpload: React.FC<ImageUploadProps> = ({ className, onUploadComplete }) => {
    return (
        <div className={className}> {/* Conteneur principal avec une classe CSS optionnelle */}
            <UploadDropzone
                appearance={{
                    container: {
                        borderColor: 'white' // Couleur de la bordure du dropzone
                    }
                }}
                endpoint="imageUploader" // Endpoint pour l'upload d'image
                onClientUploadComplete={(res) => { // Fonction appelée lorsque l'upload est complet
                    if (res && res.length > 0) {
                        // Si des fichiers sont reçus, passe le premier fichier à onUploadComplete
                        onUploadComplete(res[0] as UploadedFileData);
                    } else {
                        // Sinon, passe null à onUploadComplete
                        onUploadComplete(null);
                    }
                    console.log("Files: ", res); // Log des fichiers reçus
                }}
                onUploadError={(error: Error) => { // Fonction appelée en cas d'erreur d'upload
                    console.log(`ERROR! ${error.message}`); // Log du message d'erreur
                }}
            />
        </div>
    );
}

export default ImageUpload;
