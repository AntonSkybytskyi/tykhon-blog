import { Post } from "@prisma/client"
import { db } from "."

export const getAllPost = () => {
    return db.post.findMany();
}

export const getPublishedPosts = () => {
    return db.post.findMany({ where: { published: true } })
}

export const togglePublished = async (slug: string) => {
    const post = await getPostBySlug(slug);

    if (!post) {
        throw new Error("Post doesn't exists");
    }
    return db.post.update({
        where: { slug },
        data: {
            published: !post.published,
            publishedAt: !post.published ? new Date() : undefined
        }
    });
}
type PostCreation = Pick<Post, "title" | "description" | "slug" | "thumbnail">

export const addNewPost = async (post: PostCreation) => {
    const date = new Date()

    if (await getPostBySlug(post.slug)) {
        const suffix = `${date.getMonth()}-${date.getFullYear()}`
        console.log("Maybe return an error")
        post.slug = `${post.slug}-${suffix}`
    }

    return db.post.create({
        data: {
            ...post,
        }
    });
}

export const getPostBySlug = (slug: string) => {
    return db.post.findUnique({ where: { slug } })
}



