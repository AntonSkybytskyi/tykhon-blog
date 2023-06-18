import { Component, createEffect, createSignal } from "solid-js";
import { A, useLocation } from "solid-start";

const Header: Component = () => {
    const [isMenuOpened, setIsMenuOpened] = createSignal(false);
    const location = useLocation();

    const onMenuClick = () => {
        setIsMenuOpened((prev) => !prev);
    };

    createEffect(() => {
        location.pathname && setIsMenuOpened(false);
    });

    return (
        <nav class="bg-white py-4 shadow sticky top-0 z-10">
            <div class="container mx-auto px-4 flex justify-between items-center">
                <A href="/" class="text-lg font-semibold text-gray-800">
                    Natalia Tykhonravova Blog
                </A>
                <div class="flex md:hidden">
                    <button
                        type="button"
                        class="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                        aria-label="toggle menu"
                        onClick={onMenuClick}
                    >
                        <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                            />
                        </svg>
                    </button>
                </div>
                {/* Desktop */}
                <div class="hidden md:flex md:items-center">
                    <A
                        href="/"
                        end
                        activeClass="font-semibold"
                        class="text-gray-500 hover:text-gray-600 px-4"
                    >
                        Home
                    </A>
                    <A
                        href="/about"
                        activeClass="font-semibold"
                        class="text-gray-500 hover:text-gray-600 px-4"
                    >
                        About
                    </A>
                </div>
            </div>

            <div class="md:hidden" classList={{ ["hidden"]: !isMenuOpened() }}>
                <div class="px-2 pt-2 pb-3">
                    <A
                        href="/"
                        end
                        activeClass="font-semibold"
                        class="text-gray-500 hover:text-gray-600 block px-3 py-2 rounded-md text-base"
                    >
                        Home
                    </A>
                    <A
                        href="/about"
                        activeClass="font-semibold"
                        class="text-gray-500 hover:text-gray-600 block px-3 py-2 rounded-md text-base"
                    >
                        About
                    </A>
                </div>
            </div>
        </nav>
    );
};

export default Header;
