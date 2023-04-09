import { useRouteData } from "@solidjs/router";
import { For, Show } from "solid-js";
import { createServerData$ } from "solid-start/server";
import PostListItem from "~/components/PostListItem/PostListItem";
import { db } from "~/db";

export const routeData = () => {
    return createServerData$(() => {
        return db.post.findMany()
    })
}

export default function Home() {
    const posts = useRouteData<typeof routeData>();

    return (
        <>
            <h1 class="text-3xl font-bold mb-8">Latest Posts</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Show when={posts()}>
                    <For each={posts()}>
                        {post => <PostListItem {...post} />}
                    </For>
                </Show>
            </div>
        </>);
}
