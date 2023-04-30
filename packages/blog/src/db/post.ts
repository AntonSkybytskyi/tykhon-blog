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

export const upsertPost = async (post: PostCreation) => {
    return db.post.upsert({
        where: { slug: post.slug },
        update: { ...post },
        create: { ...post },
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
