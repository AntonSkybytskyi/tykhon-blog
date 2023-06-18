import { Show } from "solid-js";
import { FormError } from "solid-start";
import {
    createServerAction$,
    createServerData$,
    redirect,
} from "solid-start/server";
import Button from "~/components/Button/Button";
import { createUserSession } from "~/db/session";

const redirectUrl = "/";

export const routeData = () => {
    return createServerData$(async (_, { locals }) => {
        if (locals.isAdmin) {
            return redirect(redirectUrl);
        }
        return {};
    });
};

export default function AdminLogin() {
    const [loggingIn, { Form }] = createServerAction$(
        async (form: FormData) => {
            const username = form.get("username");
            const password = form.get("password");

            if (typeof username !== "string" || typeof password !== "string") {
                throw new FormError("Something went wrong");
            }

            if (
                username !== import.meta.env.VITE_ADMIN_USERNAME ||
                password !== import.meta.env.VITE_ADMIN_PASSWORD
            ) {
                throw new FormError(
                    `Username/Password combination is incorrect`,
                    {
                        fields: { username, password },
                    }
                );
            }

            return createUserSession(username, redirectUrl);
        }
    );

    return (
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <Form class="space-y-6">
                    <Show when={loggingIn.error}>
                        <div
                            role="alert"
                            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                        >
                            {loggingIn.error.message}
                        </div>
                    </Show>
                    <div>
                        <label
                            for="username"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Username
                        </label>
                        <div class="mt-1">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                autocomplete="username"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            for="password"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <div class="mt-1">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                autocomplete="current-password"
                                required
                            />
                        </div>
                    </div>

                    <div class="flex items-center justify-center">
                        <Button type="submit" class="font-bold">
                            Sign In
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
