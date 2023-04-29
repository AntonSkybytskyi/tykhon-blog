import { Post } from "@prisma/client";
import { Component, createSignal } from "solid-js";
import { A } from "solid-start";
import MyEditor from "../MyEditor/MyEditor";
import { useSavePostAction$ } from "~/hooks/useSavePostAction$";
import ImageInput from "./components/ImageInput";
import Button from "../Button/Button";

const PostCreate: Component<{ post?: Post }> = ({ post }) => {
    const [description, setDescription] = createSignal(post?.description ?? "");
    const [sending, { Form }] = useSavePostAction$();

    return (
        <Form class="max-w-2xl mx-auto" action="/post">
            <A class="block mb-4" href="/posts">
                {"<"} Back to My Posts
            </A>
            <h1 class="text-3xl font-bold text-gray-800 mb-6 ">Create Post</h1>
            <input
                type="hidden"
                id="slug"
                name="slug"
                value={post?.slug ?? ""}
            />
            <div class="mb-4">
                <label for="title" class="block text-gray-700 font-bold mb-2">
                    Title:
                </label>
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
                <ImageInput name="thumbnail" thumbnail={post?.thumbnail} />
            </div>

            <div class="mb-4">
                <label
                    for="shortDescription"
                    class="block text-gray-700 font-bold mb-2"
                >
                    Short Description:
                </label>
                <textarea
                    value={post?.shortDescription ?? ""}
                    id="shortDescription"
                    name="shortDescription"
                    rows="6"
                    class="w-full px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Write your post content here"
                ></textarea>
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2">
                    Full Description:
                </label>
                <textarea
                    value={description()}
                    class="hidden"
                    id="description"
                    name="description"
                ></textarea>
                <MyEditor
                    content={description()}
                    onUpdate={(newDescription: string) => {
                        setDescription(newDescription);
                    }}
                />
            </div>

            <div class="mt-6">
                <Button type="submit" disabled={sending.pending}>
                    {post?.slug ? "Edit Post" : "Create Post"}
                </Button>
                <Button type="button" variant="secondary" class="ml-2">
                    Cancel
                </Button>
            </div>
        </Form>
    );
};

export default PostCreate;
