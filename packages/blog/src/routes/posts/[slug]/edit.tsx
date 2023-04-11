import { createServerData$, redirect } from "solid-start/server"
import { getAdmin } from "~/db/session"


export const routeData = (() => {
    return createServerData$(async (_, { request, locals }) => {
        if (!locals.isAdmin) {
            return redirect("/");
        }
        return {};
    });
})

export default function PostEdit() {
    return <div>Hola EDIT</div>
}