import { Post } from "@prisma/client";
import { db } from ".";

export const getAllPost = () => {
    return db.post.findMany();
};

export const getPublishedPosts = () => {
    return db.post.findMany({ where: { published: true } });
};

export const togglePublished = async (slug: string) => {
    const post = await getPostBySlug(slug);

    if (!post) {
        throw new Error("Post doesn't exists");
    }
    return db.post.update({
        where: { slug },
        data: {
            published: !post.published,
            publishedAt: !post.published ? new Date() : null,
        },
    });
};
type PostCreation = Pick<
    Post,
    "title" | "description" | "slug" | "thumbnail" | "shortDescription"
>;

export const addNewPost = async (post: PostCreation) => {
    const date = new Date();

    if (await getPostBySlug(post.slug)) {
        const suffix = `${date.getMonth()}-${date.getFullYear()}`;
        console.log("Maybe return an error");
        post.slug = `${post.slug}-${suffix}`;
    }

    return db.post.create({
        data: {
            ...post,
        },
    });
};

export const editPost = async (post: PostCreation) => {
    const currentPost = await getPostBySlug(post.slug);
    if (!currentPost) {
        throw new Error("Post doens't exist");
    }

    return db.post.update({
        where: { slug: post.slug },
        data: {
            ...currentPost,
            ...post,
        },
    });
};

export const getPostBySlug = (slug: string) => {
    return db.post.findUnique({ where: { slug } });
};

export const deleteBySlug = async (slug: string) => {
    const post = await getPostBySlug(slug);

    if (!post) {
        throw new Error("Post doesn't exists");
    }

    return db.post.delete({ where: { slug } });
};
