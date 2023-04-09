import { PrismaClient } from "@prisma/client";
import { Component, Show, createResource } from "solid-js";
import { RouteDataArgs, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { db } from "~/db";
import { getPostBySlug } from "~/db/post";


export const routeData = ({ params }: RouteDataArgs) => {
    return createServerData$(
        ([, slug]) => getPostBySlug(slug),
        { key: () => ["post", params.slug] }
    );
}



const Post: Component = () => {
    const post = useRouteData<typeof routeData>();

    return <Show when={post()}>
        <div innerHTML={post().description} />
    </Show>
}

export default Post

