import { Post } from "@prisma/client";
import { Component, Resource, Show, createMemo } from "solid-js";
import { Meta, RouteDataArgs, Title, useRouteData, useSearchParams } from "solid-start";
import { createServerData$, redirect } from "solid-start/server";
import { getPostBySlug } from "~/db/post";

export const routeData = ({ params }: RouteDataArgs) => {
    return createServerData$(
        async ([, slug], { locals }) => {
            const post = await getPostBySlug(slug);
            const canOpenPost = locals.isAdmin || post?.published;

            if (!canOpenPost) {
                return redirect("/404");
            }
            return post;
        },
        {
            key: () => ["slug", params.slug],
        }
    );
};

const SinglePost: Component = () => {
    const data = useRouteData<() => Resource<Post>>();
    const publishedTime = createMemo(() => {
        const { publishedAt } = data() ?? {};
        if (!publishedAt) {
            return "";
        }
        return new Date(publishedAt).toDateString();
    });

    return (
        <Show when={data()}>
            {(post) => (
                <>
                    <Title>{post().title}</Title>
                    <Meta name="description" content={post().keywords} />
                    <h1 class="text-3xl font-bold mb-4">{post().title}</h1>
                    <p class="text-gray-600 mb-4">
                        Posted on {publishedTime()}
                    </p>
                    {/* todo: Add tags to posts */}
                    <Show when={false}>
                        <div class="text-gray-400 text-sm mb-4">
                            <span class="mr-2">
                                <i class="fas fa-tags"></i>
                                <a
                                    href="#"
                                    class="hover:text-gray-200 bg-green-500 text-white rounded-full px-3 py-1 mr-3"
                                >
                                    Technology
                                </a>
                                <a
                                    href="#"
                                    class="hover:text-gray-200 bg-purple-500 text-white rounded-full px-3 py-1 mr-3"
                                >
                                    Gadgets
                                </a>
                            </span>
                        </div>
                    </Show>

                    {post().thumbnail && (
                        <img
                            src={post().thumbnail!}
                            alt={post().title}
                            class="w-full h-64 object-contain rounded-lg mb-4"
                        />
                    )}

                    <p innerHTML={post().description} />
                </>
            )}
        </Show>
    );
};

export default SinglePost;
