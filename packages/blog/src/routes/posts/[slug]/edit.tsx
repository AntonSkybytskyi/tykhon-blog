import { Post } from "@prisma/client";
import { Show } from "solid-js";
import { RouteDataArgs, useRouteData } from "solid-start";
import { createServerData$, redirect } from "solid-start/server"
import PostCreate from "~/components/PostCreate/PostCreate";
import { getPostBySlug } from "~/db/post";


export const routeData = (({ params }: RouteDataArgs) => {
    return createServerData$(async ([, slug], { locals }) => {
        if (!locals.isAdmin) {
            return redirect("/");
        }

        return getPostBySlug(slug);
    }, {
        key: () => ["slug", params.slug]
    });
})

export default function PostEdit() {
    const post = useRouteData<typeof routeData>()

    return <Show when={post()} fallback={<div>Loading...</div>}>
        <PostCreate post={post() as Post} />
    </Show>
}