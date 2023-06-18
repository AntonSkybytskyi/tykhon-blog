import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import { APIEvent } from "solid-start";
import { getPublishedPosts } from "~/db/post";

export async function GET({ request, ...args }: APIEvent) {
    const posts = await getPublishedPosts();
    const links = posts.map(({ slug }) => ({
        url: `/posts/${slug}`,
        changefreq: "daily",
        priority: 0.3,
    }));

    const stream = new SitemapStream({
        hostname: `https://${request.headers.get("host")}`,
    });

    const xmlString = await streamToPromise(
        Readable.from(links).pipe(stream)
    ).then((data) => data.toString());

    return new Response(xmlString, {
        headers: {
            "content-type": "application/xml",
        },
    });
}
