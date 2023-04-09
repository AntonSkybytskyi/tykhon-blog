
export default async function fetchAPI(path: string) {
    const post = await new Promise((resolve) => resolve({
        title: "title",
        slug: path,
        text: "hello long text will be here"
    }))

    return post
}
