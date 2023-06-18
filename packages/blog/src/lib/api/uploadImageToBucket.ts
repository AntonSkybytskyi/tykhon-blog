import { Upload } from "@aws-sdk/lib-storage";
import {
    CompleteMultipartUploadCommandOutput,
    DeleteObjectCommand,
    S3,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import s3Client from "./aws/s3Client";

export const deleteImageFromBucket = async (
    url: string = "b24c40db-e756-4d41-8342-431b9cba07a5.jpg"
) => {
    try {
        const s3 = new S3({
            credentials: {
                accessKeyId: process.env.ACCESS_KEY ?? "",
                secretAccessKey: process.env.SECRET_ACCESS_KEY ?? "",
            },
            region: process.env.REGION ?? "",
        });
        const data = s3.send(
            new DeleteObjectCommand({
                Bucket: process.env.BUCKET_NAME,
                Key: url,
            })
        );
        console.log("Success. Object deleted.", data);
        return data; // For unit tests.
    } catch (err) {
        console.log("Error", err);
    }
};

export const uploadImageToBucket = async (file: File | null) => {
    console.log("::____ uploadImageToBucket");
    if (file === null) {
        throw new Error("File doesn't define");
    }

    const type = file.name.split(".").at(-1);

    const parallelUploads3 = new Upload({
        client: s3Client,
        params: {
            Bucket: process.env.BUCKET_NAME,
            Key: `${uuidv4()}.${type}`,
            Body: file as File,
        },
        queueSize: 4, // optional concurrency configuration
        partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
        leavePartsOnError: false, // optional manually handle dropped parts
    });

    parallelUploads3.on("httpUploadProgress", (progress) => {
        console.log(progress);
    });

    const { Location: url = "" } =
        (await parallelUploads3.done()) as CompleteMultipartUploadCommandOutput;

    return {
        url,
    };
};
