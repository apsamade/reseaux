export interface UploadedFileData {
    url: string;
    key: string;
    name: string;
    size: number;
    type: string;
    customId: string | null;
    serverData: {
        uploadedBy: string;
    };
}
