import { PrismaClient } from "@prisma/client";
import { deleteImageFromBucket } from "~/lib/api/uploadImageToBucket";

export const db = new PrismaClient();

db.$use(async (params, next) => {
    if (params.model === "Post") {
        if (params.action === "upsert") {
            const prevPost = await db.post.findUnique({
                where: params.args.where,
            });

            const result = await next(params);

            if (
                !!prevPost &&
                prevPost.thumbnail !== null &&
                prevPost.thumbnail !== "" &&
                prevPost.thumbnail !== result.thumbnail
            ) {
                console.log("trigger delete prev image", {
                    url: prevPost?.thumbnail,
                });
            }
            await deleteImageFromBucket();

            return result;
        }
    }

    return next(params);
});
