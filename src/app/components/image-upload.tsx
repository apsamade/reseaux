'use client'

import { UploadDropzone } from "@/utils/uploadthing"
import { useState } from "react";

interface ImageUploadProps {
    className?: string;
    imageUpdatedUrl?: Object;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ className, imageUpdatedUrl }) => {

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
                    imageUpdatedUrl(res[0]);
                    console.log("Files: ", res);
                }}
                onUploadError={(error: Error) => {
                    console.log(`ERROR! ${error.message}`);
                }}
            />
        </div>
    )
}

export default ImageUpload;
