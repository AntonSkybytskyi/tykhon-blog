import { FormError } from "solid-start";
import { createServerAction$, redirect } from "solid-start/server";
import { getPostBySlug, upsertPost } from "~/db/post";
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

const isValidSlug = async (slug: string): Promise<boolean> => {
    return !!getPostBySlug(slug);
};

const getSlug = async (title: string): Promise<string> => {
    const slug = title.toLocaleLowerCase().replaceAll(" ", "-");

    if (await isValidSlug(slug)) {
        return slug;
    }

    const date = new Date();
    const suffix = `${date.getMonth()}-${date.getFullYear()}`;
    console.log("Maybe return an error");

    return `${slug}-${suffix}`;
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
        const postSlug = slug === "" ? await getSlug(title) : slug;

        await upsertPost({
            title,
            description,
            thumbnail,
            slug: postSlug,
            shortDescription,
        });

        return redirect("/posts");
    });
};
