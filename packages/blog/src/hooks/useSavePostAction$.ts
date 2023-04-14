import { FormError } from "solid-start";
import { createServerAction$, redirect } from "solid-start/server";
import { addNewPost, editPost } from "~/db/post";

export const useSavePostAction$ = () => {
    return createServerAction$(async (form: FormData, { request }) => {
        const title = form.get("title");
        const description = form.get("description");
        const thumbnail = form.get("thumbnail");
        const slug = form.get("slug");
        const shortDescription = form.get("shortDescription");

        if (
            typeof title !== "string"
            || typeof description !== "string"
            || typeof thumbnail !== "string"
            || typeof slug !== "string"
            || typeof shortDescription !== "string"
        ) {
            throw new FormError("Something went wrong with data");
        }

        if (slug === "") {
            const newSlug = title.toLocaleLowerCase().replaceAll(" ", "-");
            await addNewPost({ title, description, thumbnail, slug: newSlug, shortDescription });
        } else {
            await editPost({ title, description, thumbnail, slug, shortDescription });
        }

        return redirect("/posts");
    });
}