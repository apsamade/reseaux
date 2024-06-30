import {
    generateUploadButton, // Fonction pour générer un bouton de téléchargement
    generateUploadDropzone, // Fonction pour générer une zone de dépôt
} from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core"; // Type pour le routeur des fichiers

// Création d'un bouton de téléchargement avec la configuration de notre routeur de fichiers
export const UploadButton = generateUploadButton<OurFileRouter>();

// Création d'une zone de dépôt pour les fichiers avec la configuration de notre routeur de fichiers
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
