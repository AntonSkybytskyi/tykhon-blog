export default function Signle() {
    return (
        <main class="container mx-auto px-4 py-8">
            <h1 class="text-3xl font-bold mb-4">Post Title</h1>
            <p class="text-gray-600 mb-4">Posted on April 8, 2023</p>
            <div class="text-gray-400 text-sm mb-4">
                <span class="mr-2"><i class="fas fa-tags"></i>
                    <a href="#" class="hover:text-gray-200 bg-green-500 text-white rounded-full px-3 py-1 mr-3">Technology</a>
                    <a href="#" class="hover:text-gray-200 bg-purple-500 text-white rounded-full px-3 py-1 mr-3">Gadgets</a>
                </span>
            </div>


            <img src="https://picsum.photos/800/400" alt="" class="w-full h-64 object-cover rounded-lg mb-4" />
            <p class="text-gray-600 leading-relaxed mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus, elit sit amet sodales lacinia, massa ipsum imperdiet purus, vel malesuada velit velit in nisi. Sed eleifend posuere elit, vel suscipit lorem scelerisque a. Sed tempor est eu velit laoreet fermentum. Maecenas non magna ac turpis ultrices posuere vel ac urna. Aliquam pulvinar elementum gravida. Fusce nec nunc non dolor pulvinar tempor vel id magna. Nunc convallis velit sapien, vel pretium magna vestibulum id. Fusce maximus, metus in vulputate fringilla, turpis libero convallis felis, nec scelerisque lorem dolor eu leo. Fusce auctor nibh vitae risus tincidunt pretium. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut vel interdum ante.</p>
            <p class="text-gray-600 leading-relaxed mb-4">Praesent tincidunt odio in eleifend sagittis. Vestibulum venenatis sapien vitae justo tincidunt, quis pellentesque velit ultricies. Suspendisse sollicitudin aliquet est, eget maximus elit laoreet non. Sed elementum convallis tincidunt. Maecenas non rhoncus risus. Nam at mollis orci, eget consequat nulla. Maecenas ut dolor sed nisi faucibus lobortis in quis augue. Sed id ante lobortis, aliquet enim vel, malesuada justo. Praesent vel sapien ex.</p>

            <section class="mb-8">
                <h2 class="text-2xl font-bold mb-4">Media</h2>
                <div class="flex flex-wrap justify-center">
                    <div class="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
                        <img src="https://picsum.photos/400/400" alt="" class="w-full h-64 object-cover rounded-lg" />
                    </div>
                    <div class="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
                        <img src="https://picsum.photos/400/400" alt="" class="w-full h-64 object-cover rounded-lg" />
                    </div>
                    <div class="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
                        <img src="https://picsum.photos/400/400" alt="" class="w-full h-64 object-cover rounded-lg" />
                    </div>
                    <div class="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
                        <div class="relative">
                            <iframe width="100%" height="0" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            <div class="pb-16/9"></div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}