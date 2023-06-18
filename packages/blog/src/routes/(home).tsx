import { useRouteData } from "@solidjs/router";
import { For, Show } from "solid-js";
import { createServerData$ } from "solid-start/server";
import PostListItem from "~/components/PostListItem/PostListItem";
import PageTitle from "~/components/PageTitle/PageTitle";
import { getPublishedPosts } from "~/db/post";

export const routeData = () => {
    return createServerData$(() => {
        return getPublishedPosts();
    });
};

export default function Home() {
    const posts = useRouteData<typeof routeData>();

    return (
        <>
            <PageTitle>Latest Posts</PageTitle>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Show when={posts()}>
                    <For each={posts()}>
                        {(post) => <PostListItem {...post} />}
                    </For>
                </Show>
            </div>
        </>
    );
}
