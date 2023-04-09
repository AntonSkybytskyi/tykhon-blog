import { Component } from "solid-js";

const Header: Component = () => {
    return (
        <nav class="bg-white py-4 shadow">
            <div class="container mx-auto px-4">
                <a href="#" class="text-lg font-semibold text-gray-800">My Minimalist Blog</a>
            </div>
        </nav>
    )
};

export default Header