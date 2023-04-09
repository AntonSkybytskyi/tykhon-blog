import { json } from "solid-start";

export function GET() {
    const posts = [{
        title: "Post Title",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus, elit sit amet sodales lacinia, massa ipsum imperdiet purus, vel malesuada velit velit in nisi. Sed eleifend posuere elit, vel suscipit lorem scelerisque a.",
        slug: "test-slug",
        thumbnail: "https://picsum.photos/500/300"
    }, {
        title: "Post Title 2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus, elit sit amet sodales lacinia, massa ipsum imperdiet purus, vel malesuada velit velit in nisi. Sed eleifend posuere elit, vel suscipit lorem scelerisque a.",
        slug: "test-slug-2",
        thumbnail: "https://picsum.photos/500/300"
    }, {
        title: "Post Title 3",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus, elit sit amet sodales lacinia, massa ipsum imperdiet purus, vel malesuada velit velit in nisi. Sed eleifend posuere elit, vel suscipit lorem scelerisque a.",
        slug: "test-slug-3",
        thumbnail: "https://picsum.photos/500/300"
    }];

    return json(posts);
}