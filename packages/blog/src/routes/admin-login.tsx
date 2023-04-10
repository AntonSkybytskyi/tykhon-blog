import { Show } from "solid-js";
import { FormError, useRouteData } from "solid-start";
import { createServerAction$, createServerData$, redirect } from "solid-start/server";
import { createUserSession, getAdmin } from "~/db/session";

const redirectUrl = "/";

export const routeData = () => {
    return createServerData$(async (_, { request }) => {
        if (await getAdmin(request) !== null) {
            return redirect("/");
        }
        return {};
    });
};

export default function AdminLogin() {
    const [loggingIn, { Form }] = createServerAction$(async (form: FormData) => {
        const username = form.get("username");
        const password = form.get("password");

        if (username !== import.meta.env.VITE_ADMIN_USERNAME || password !== import.meta.env.VITE_ADMIN_PASSWORD) {
            throw new FormError(`Username/Password combination is incorrect`, {
                fields: { username, password },
            });
        }

        return createUserSession("admin", redirectUrl);
    });

    return (
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <Form class="space-y-6">
                    <Show when={loggingIn.error}>
                        <div role="alert" class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
                            {loggingIn.error.message}
                        </div>
                    </Show>
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <div class="mt-1">
                            <input id="email" name="username" type="text" autocomplete="username" required
                                class="appearance-none rounded-md relative block w-full px-3 py-2 border 
                                  border-gray-300 placeholder-gray-500 text-gray-900 
                                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                                  focus:z-10 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div class="mt-1">
                            <input id="password" name="password" type="password" autocomplete="current-password" required
                                class="appearance-none rounded-md relative block w-full px-3 py-2 border 
                                  border-gray-300 placeholder-gray-500 text-gray-900 
                                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                                  focus:z-10 sm:text-sm" />
                        </div>
                    </div>

                    <div class="flex items-center justify-center">
                        <button class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Sign In
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    )

}