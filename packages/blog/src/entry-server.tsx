import {
    StartServer,
    createHandler,
    renderAsync,
} from "solid-start/entry-server";
import { getAdmin } from "./db/session";

export default createHandler(
    ({ forward }) =>
        async (event) => {
            event.locals.isAdmin = !!(await getAdmin(event.request));

            return forward(event);
        },
    renderAsync((event) => <StartServer event={event} />)
);
