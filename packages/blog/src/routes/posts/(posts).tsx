import { Post } from "@prisma/client";
import { Component, For, createEffect, createSignal } from "solid-js";
import { A, FormError, useRouteData } from "solid-start";
import { createServerAction$, createServerData$, redirect } from "solid-start/server";
import Button from "~/components/Button/Button";
import ConfirmButton from "~/components/ConfirmButton/ConfirmButton";
import { deleteBySlug, getAllPost, togglePublished } from "~/db/post";

export const routeData = (() => {
    return createServerData$(async (_, { locals }) => {
        if (!locals.isAdmin) {
            return redirect("/404");
        }
        return getAllPost();
    });
});

const TableRow: Component<{ post: Post }> = ({ post: data }) => {
    const [post, setPost] = createSignal<Post>(data);
    const [editing, { Form: FormEdit }] = createServerAction$((formData: FormData) => {
        const slug = formData.get("slug");
        if (typeof slug !== "string") {
            throw new FormError("Somethign went wrong")
        }

        return togglePublished(slug);
    });

    const [deleting, { Form: FormDelete }] = createServerAction$((formData: FormData) => {
        const slug = formData.get("slug");
        console.log({ slug })
        if (typeof slug !== "string" || slug.length === 0) {
            throw new FormError("Something went wrong");
        }

        return deleteBySlug(slug);
    });

    createEffect(() => {
        if (editing.result) {
            setPost(editing.result);
        }
    });

    return (
        <tr>
            <td class="px-6 py-4 whitespace-nowrap">
                <A href={post().slug} class="text-sm font-medium text-blue-500 hover:text-blue-700 hover:underline">
                    {post().title}
                </A>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    classList={{
                        ["bg-green-100 text-green-800"]: !!post().published,
                        ["bg-red-100 text-red-800"]: !post().published
                    }}
                >
                    {post().published ? "Published" : "Unpublished"}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Button class="font-bold" href={`${post().slug}/edit`} >
                    Edit
                </Button>
                <FormDelete class="inline">
                    <input type="hidden" name="slug" value={post().slug} />
                    <ConfirmButton
                        variant="danger"
                        class="font-bold ml-4"
                        submitButtonType="submit"
                        disabled={deleting.pending}
                    >
                        Delete
                    </ConfirmButton>
                </FormDelete>

                <FormEdit class="inline">
                    <input type="hidden" name="slug" value={post().slug} />
                    <Button type="submit" variant="success" class="font-bold ml-4" disabled={editing.pending}>
                        <>{post().published ? "Unpublish" : "Publish"}</>
                    </Button>
                </FormEdit>
            </td>
        </tr >
    );
};


export default function Posts() {
    const posts = useRouteData<typeof routeData>();

    return (

        <div class="px-4 py-6 sm:px-0">
            <div class="flex justify-between mb-6">
                <h1 class="text-2xl font-bold text-gray-800">Author's Posts</h1>
                <span>
                    <Button class="inline-block" href="/posts/create">
                        Create New Post
                    </Button>
                </span>
            </div>
            <div class="mt-6">
                <div class="flex flex-col">
                    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Title
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200">
                                        <For each={posts() as Post[]}>
                                            {(post) => <TableRow post={post} />}
                                        </For>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}