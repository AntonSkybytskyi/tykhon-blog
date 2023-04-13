import { Component, Show, createEffect, createSignal } from "solid-js";
import { A, useLocation } from "solid-start";
import { createServerAction$, createServerData$ } from "solid-start/server";
import { logout } from "~/db/session";

export const routeData = () => {
    return createServerData$(async (_, { request }) => {
        console.log({ request })
        return {};
    });
};
const Header: Component = () => {
    const [isMenuOpened, setIsMenuOpened] = createSignal(false);
    const location = useLocation();

    const onMenuClick = () => {
        setIsMenuOpened((prev) => !prev);
    };

    createEffect(() => {
        location.pathname && setIsMenuOpened(false);
    });


    const [, { Form }] = createServerAction$((_: FormData) => {
        return logout("/")
    })

    return (
        <nav class="bg-white py-4 shadow sticky top-0">
            <div class="container mx-auto px-4 flex justify-between items-center">
                <A href="/" class="text-lg font-semibold text-gray-800">Natalia Tykhonravova Blog</A>
                <div class="flex md:hidden">
                    <button type="button" class="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600" aria-label="toggle menu" onClick={onMenuClick}>
                        <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
                        </svg>
                    </button>
                </div>
                {/* Desktop */}
                <div class="hidden md:flex md:items-center">
                    <A href="/" end activeClass="font-semibold" class="text-gray-500 hover:text-gray-600 px-4">Home</A>
                    <A href="/about" activeClass="font-semibold" class="text-gray-500 hover:text-gray-600 px-4">About</A>
                    <Show when={true}>

                        <A href={"/posts"} activeClass="font-semibold" class="text-gray-500 hover:text-gray-600 px-4">My Posts</A>
                        <Form>
                            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Logout</button>
                        </Form>
                    </Show>


                </div>
            </div>

            <div class="md:hidden" classList={{ ["hidden"]: !isMenuOpened() }}>
                <div class="px-2 pt-2 pb-3">
                    <A href="/" end activeClass="font-semibold" class="text-gray-500 hover:text-gray-600 block px-3 py-2 rounded-md text-base">Home</A>
                    <A href="/about" activeClass="font-semibold" class="text-gray-500 hover:text-gray-600 block px-3 py-2 rounded-md text-base">About</A>
                    <Show when={true}>
                        <A href={"/posts"} activeClass="font-semibold" class="text-gray-500 hover:text-gray-600 block px-3 py-2 rounded-md text-base">My Posts</A>
                        <Form class="px-3">
                            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Logout</button>
                        </Form>
                    </Show>
                </div>
            </div>
        </nav>
    );
};

export default Header;