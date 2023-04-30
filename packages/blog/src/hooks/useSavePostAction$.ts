import { FormError } from "solid-start";
import { createServerAction$, redirect } from "solid-start/server";
import { addNewPost, editPost } from "~/db/post";
import { uploadImageToBucket } from "~/lib/api/uploadImageToBucket";
import { isValidThumbnailType$ } from "~/utils/isValidThumbnail";

const getThumbnailUrl = async (
    thumbnail: string | null,
    thumbnailBlog: File | null
): Promise<string> => {
    if (thumbnailBlog && isValidThumbnailType$(thumbnailBlog)) {
        const { url } = await uploadImageToBucket(thumbnailBlog);
        return url;
    }
    return thumbnail ?? "";
};

export const useSavePostAction$ = () => {
    return createServerAction$(async (form: FormData, { request }) => {
        const title = form.get("title");
        const description = form.get("description");
        const slug = form.get("slug");
        const shortDescription = form.get("shortDescription");
        const currentThumbnail = form.get("thumbnail");
        if (
            typeof title !== "string" ||
            typeof description !== "string" ||
            typeof slug !== "string" ||
            typeof shortDescription !== "string" ||
            typeof currentThumbnail !== "string"
        ) {
            throw new FormError("Something went wrong with data");
        }

        // todo: add remove current image form bucket
        const thumbnail = await getThumbnailUrl(
            currentThumbnail,
            form.get("thumbnailBlob") as File
        );

        if (slug === "") {
            const newSlug = title.toLocaleLowerCase().replaceAll(" ", "-");
            await addNewPost({
                title,
                description,
                thumbnail,
                slug: newSlug,
                shortDescription,
            });
        } else {
            await editPost({
                title,
                description,
                thumbnail,
                slug,
                shortDescription,
            });
        }

        return redirect("/posts");
    });
};
