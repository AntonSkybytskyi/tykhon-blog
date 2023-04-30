import { S3 } from "@aws-sdk/client-s3";

const s3 = new S3({
    credentials: {
        accessKeyId: process.env.ACCESS_KEY ?? "",
        secretAccessKey: process.env.SECRET_ACCESS_KEY ?? "",
    },
    region: process.env.REGION ?? "",
});

export default s3;
