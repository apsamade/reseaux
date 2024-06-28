'use client'

import { UploadDropzone } from "@/utils/uploadthing";
import type { UploadedFileData } from "@/types/types";

interface ImageUploadProps {
    className?: string;
    onUploadComplete: (image: UploadedFileData | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ className, onUploadComplete }) => {
    return (
        <div className={className}>
            <UploadDropzone
                appearance={{
                    container: {
                        borderColor: 'white'
                    }
                }}
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    if (res && res.length > 0) {
                        onUploadComplete(res[0] as UploadedFileData);
                    } else {
                        onUploadComplete(null);
                    }
                    console.log("Files: ", res);
                }}
                onUploadError={(error: Error) => {
                    console.log(`ERROR! ${error.message}`);
                }}
            />
        </div>
    );
}

export default ImageUpload;
