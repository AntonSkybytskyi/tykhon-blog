
import { Upload } from "@aws-sdk/lib-storage";
import { S3, CompleteMultipartUploadCommandOutput } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

export const uploadImageToBucket = async (file: File | null) => {
    if (file === null) {
        throw new Error("File doesn't define");
    }

    const type = file.name.split(".").at(-1);

    const parallelUploads3 = new Upload({
        client: new S3({
            credentials: {
                accessKeyId: process.env.ACCESS_KEY ?? "",
                secretAccessKey: process.env.SECRET_ACCESS_KEY ?? "",
            },
            region: process.env.REGION ?? "",
        }),
        params: { Bucket: process.env.BUCKET_NAME, Key: `${uuidv4()}.${type}`, Body: file as File },
        queueSize: 4, // optional concurrency configuration
        partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
        leavePartsOnError: false, // optional manually handle dropped parts
    });

    parallelUploads3.on("httpUploadProgress", (progress) => {
        console.log(progress);
    });

    const { Location: url = "" } = await parallelUploads3.done() as CompleteMultipartUploadCommandOutput;

    return {
        url,
    }
}