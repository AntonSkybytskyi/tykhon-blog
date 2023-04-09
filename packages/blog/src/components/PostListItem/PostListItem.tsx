import { A } from "@solidjs/router";
import { Component } from "solid-js";
import { PostListItem as IPostListItem } from "~/types";

const PostListItem: Component<IPostListItem> = ({ title, description, slug, thumbnail }) => {
    return (
        <div class="bg-white rounded-lg shadow">
            {thumbnail && <img src={thumbnail} alt={title} class="w-full h-64 object-cover rounded-t-lg" />}
            <div class="p-4">
                <a href="#" class="block text-lg font-semibold mb-2 hover:text-blue-500">{title}</a>
                <p class="text-gray-600 leading-relaxed mb-4">{description}</p>
                <A href={`/posts/${slug}`} class="text-blue-500 hover:text-~blue-600">Read More</A>
            </div>
        </div>
    )
};

export default PostListItem