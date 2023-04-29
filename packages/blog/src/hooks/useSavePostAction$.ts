import { FormError } from "solid-start";
import { createServerAction$, redirect } from "solid-start/server";
import { addNewPost, editPost } from "~/db/post";
import { uploadImageToBucket } from "~/lib/api/uploadImageToBucket";

const getThumbnailUrl = async (
    thumbnail: File | string | null
): Promise<string> => {
    if (thumbnail !== null || thumbnail !== "string") {
        const { url } = await uploadImageToBucket(thumbnail as File);
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
        if (
            typeof title !== "string" ||
            typeof description !== "string" ||
            typeof slug !== "string" ||
            typeof shortDescription !== "string"
        ) {
            throw new FormError("Something went wrong with data");
        }

        // todo: add remove current image form bucket
        const thumbnail = await getThumbnailUrl(form.get("thumbnail"));

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
