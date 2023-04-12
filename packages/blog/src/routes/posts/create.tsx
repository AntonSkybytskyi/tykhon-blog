import { FormError } from "solid-start"
import { createServerAction$ } from "solid-start/server"
import { createPost } from "~/db/post"

const CreatePost = () => {
    const [, { Form }] = createServerAction$((form: FormData, { request }) => {
        const title = form.get("title")
        const description = form.get("description")

        if (title === null || description === null) {
            console.log("went wrong")
            throw new FormError("Something went wornd");

        }

        return createPost({
            title,
            description,
        });
    })


    return <div>
        <Form class="w-full max-w-lg mx-auto mt-10">
            <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="title">
                    Title
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" name="title" type="text" placeholder="Enter title" />
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 font-bold mb-2" for="description">
                    Description
                </label>
                <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" name="description" placeholder="Enter description"></textarea>
            </div>
            <div class="flex items-center justify-center">
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Submit
                </button>
            </div>
        </Form>
    </div>
}

export default CreatePost;