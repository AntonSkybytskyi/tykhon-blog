import { Component } from "solid-js";

const Footer: Component = () => {
    return (
        <footer class="bg-white py-4">
            <div class="container mx-auto px-4">
                <div class="flex flex-wrap flex-shrink-0">
                    <div class="w-full md:w-2/3 lg:w-2/3 mb-4 md:mb-0">
                        <h2 class="text-lg font-bold mb-2">About Us</h2>
                        <p class="leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel sodales tellus, vel feugiat dolor. Nullam varius nunc eget lorem tristique tincidunt. Sed auctor eu nulla id ornare.</p>
                    </div>

                    <div class="w-full md:w-1/3 lg:w-1/3 mb-4 md:mb-0">
                        <h2 class="text-lg font-bold mb-2">Contact Us</h2>
                        <p class="leading-relaxed"><a class="text-blue-500 underline" href="mailto:natalia.tykhonravova@gmail.com">natalia.tykhonravova@gmail.com</a></p>
                    </div>

                </div>
            </div>
        </footer>
    )
};

export default Footer;