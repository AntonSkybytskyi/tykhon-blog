import { Component } from "solid-js";

const Footer: Component = () => {
    return (
        <footer class="bg-white py-4">
            <div class="container mx-auto px-4">
                <div class="flex flex-wrap flex-shrink-0">
                    <div class="w-full md:w-2/3 lg:w-2/3 mb-4 md:mb-0">
                        <h2 class="text-lg font-bold mb-2">About Me</h2>
                        <p class="leading-relaxed">
                            Hi! I'm Natalia, a Quality Assurance team lead with nine years of experience in the IT industry, specializing in QA for over six years. I find great satisfaction in my role as a lead and all aspects related to it. Recently, mentoring has become my new passion, as I firmly believe in the importance of self-development for professionals. Feel free to reach out to me with any inquiries you may have.
                        </p>
                    </div>

                    <div class="w-full md:w-1/3 lg:w-1/3 mb-4 md:mb-0">
                        <h2 class="text-lg font-bold mb-2">Contact Me</h2>
                        <p class="leading-relaxed">
                            <a
                                class="text-blue-500 underline"
                                href="mailto:natalia.tykhonravova@gmail.com"
                            >
                                natalia.tykhonravova@gmail.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
