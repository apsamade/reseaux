export interface UploadedFileData {
    url: string;          // URL où le fichier est accessible
    key: string;          // Clé unique pour identifier le fichier
    name: string;         // Nom original du fichier
    size: number;         // Taille du fichier en octets
    type: string;         // Type MIME du fichier (ex. 'image/jpeg')
    customId: string | null;  // Identifiant personnalisé pour le fichier, ou null s'il n'en a pas
    serverData: {          // Données supplémentaires du serveur associées au fichier
        uploadedBy: string;  // Identifiant de l'utilisateur ayant téléchargé le fichier
    };
}
