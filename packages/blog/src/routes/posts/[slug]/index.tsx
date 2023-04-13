import { Post } from "@prisma/client";
import { Component, Show, createMemo } from "solid-js";
import { RouteDataArgs, useRouteData } from "solid-start";
import { createServerData$, redirect } from "solid-start/server";
import { getPostBySlug } from "~/db/post";

export const routeData = ({ params }: RouteDataArgs) => {
    return createServerData$(async ([, slug]) => {
        const post = await getPostBySlug(slug);
        if (!post || !post.published) {
            return redirect("/404");
        }
        return post;
    }, {
        key: () => ["slug", params.slug]
    });
}

const SinglePost: Component = () => {
    const post = useRouteData<typeof routeData>();

    const publishedTime = createMemo(() => {
        if (!post()) {
            return ""
        }
        return new Date((post() as Post).publishedAt!).toDateString()
    })

    return <Show when={post()}>
        <h1 class="text-3xl font-bold mb-4">{(post() as Post).title}</h1>
        <p class="text-gray-600 mb-4">Posted on {publishedTime()}</p>
        <div class="text-gray-400 text-sm mb-4">
            <span class="mr-2"><i class="fas fa-tags"></i>
                <a href="#" class="hover:text-gray-200 bg-green-500 text-white rounded-full px-3 py-1 mr-3">Technology</a>
                <a href="#" class="hover:text-gray-200 bg-purple-500 text-white rounded-full px-3 py-1 mr-3">Gadgets</a>
            </span>
        </div>


        {(post() as Post).thumbnail && <img src={(post() as Post).thumbnail!} alt={(post() as Post).title} class="w-full h-64 object-cover rounded-lg mb-4" />}

        <p innerHTML={(post() as Post).description} />
    </Show>
}

export default SinglePost

