import { Post } from "@prisma/client";
import { Component, createSignal } from "solid-js";
import { A, FormError } from "solid-start";
import { createServerAction$ } from "solid-start/server";
import MyEditor from "../MyEditor/MyEditor";
import { addNewPost, editPost } from "~/db/post";


const PostCreate: Component<{ post?: Post }> = ({ post }) => {
    const [description, setDescription] = createSignal(post?.description ?? "")
    const [sending, { Form }] = createServerAction$((form: FormData, { request }) => {
        const title = form.get("title");
        const description = form.get("description");
        const thumbnail = form.get("thumbnail");
        const slug = form.get("slug");

        if (typeof title !== "string" || typeof description !== "string" || typeof thumbnail !== "string" || typeof slug !== "string") {
            throw new FormError("Something went wrong with data");
        }

        if (slug === "") {
            const newSlug = title.toLocaleLowerCase().replaceAll(" ", "-");
            return addNewPost({ title, description, thumbnail, slug: newSlug });
        }

        return editPost({ title, description, thumbnail, slug });
    });


    return (
        <Form class="max-w-2xl mx-auto">
            <A class="block mb-4" href="/posts">{"<"} Back to My Posts</A>
            <h1 class="text-3xl font-bold text-gray-800 mb-6 ">Create Post</h1>
            <input type="hidden" id="slug" name="slug" value={post?.slug ?? ""} />
            <div class="mb-4">
                <label for="title" class="block text-gray-700 font-bold mb-2">Title:</label>
                <input
                    value={post?.title ?? ""}
                    type="text"
                    id="title"
                    name="title"
                    class="w-full px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter the title of your post"
                />
            </div>

            <div class="mb-4">
                <label for="thumbnail" class="block text-gray-700 font-bold mb-2">Thumbnail URL(image loading in the future):</label>
                <input
                    value={post?.thumbnail ?? ""}
                    type="text"
                    id="thumbnail"
                    name="thumbnail"
                    class="w-full px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter link to thumbnail"
                />

            </div>

            <textarea value={description()} class="hidden" id="description" name="description"></textarea>
            <MyEditor content={description()} onUpdate={(newDescription: string) => {
                setDescription(newDescription)
            }} />

            <div class="mt-6">
                <button
                    type="submit"
                    class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={sending.pending}
                >
                    {post?.slug ? "Edit Post" : "Create Post"}
                </button>
                <button type="button" class="bg-slate-600 text-white py-2 px-4 rounded hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed ml-2">Cancel</button>
            </div>
        </Form>
    );
};

export default PostCreate;