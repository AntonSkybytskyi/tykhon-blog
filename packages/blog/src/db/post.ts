import { PrismaClient } from "@prisma/client"
import { Params } from "solid-start/islands/server-router"
import { createServerData$ } from "solid-start/server"
import { db } from "."

export const createRandomPost = () => {
    return db.post.create({
        data: {
            slug: "next-test",
            description: "<strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
    })
}

interface CreatePost {
    title: string
    description: string
}

export const createPost = (props: CreatePost) => {
    const slug = props.title.toLowerCase().replaceAll(" ", "-")
    console.log({ slug })
    return db.post.create({
        data: {
            ...props,
            slug,
        }
    })
}

export const getPostBySlug = (slug: string) => {
    return db.post.findUnique({ where: { slug } })
}



