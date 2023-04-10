import { A } from "@solidjs/router";
import { Component } from "solid-js";
import { PostListItem as IPostListItem } from "~/types";

const PostListItem: Component<IPostListItem> = ({ title, description, slug, thumbnail }) => {
    return (
        <A href={`/posts/${slug}`} class="block bg-white rounded-lg shadow border border-transparent hover:border-blue-500 ">
            {thumbnail && <img src={thumbnail} alt={title} class="w-full h-64 object-cover rounded-t-lg" />}
            <div class="p-4 align-bottom justify-end">
                <h3 class="block text-lg font-semibold mb-2">{title}</h3>
                <p class="text-gray-600 leading-relaxed mb-4">{description}</p>
            </div>
        </A>
    );
};

export default PostListItem;