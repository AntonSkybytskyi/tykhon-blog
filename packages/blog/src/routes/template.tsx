export default function Template() {

    return (
        <>
            <section class="container mx-auto px-4 my-8">
                <h2 class="text-2xl font-bold mb-4">About Me</h2>
                <p class="text-gray-600 leading-relaxed mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus, elit sit amet sodales lacinia, massa ipsum imperdiet purus, vel malesuada velit velit in nisi. Sed eleifend posuere elit, vel suscipit lorem scelerisque a. Integer bibendum sodales lectus vitae viverra. Nunc id leo in massa consectetur imperdiet eu vel elit. Phasellus vel tincidunt nulla. Aenean iaculis vel ex ut luctus. Nulla faucibus aliquam massa. Aliquam vitae ullamcorper magna. </p>
            </section>
            <main class="container mx-auto px-4 my-8 flex-grow">
                <h1 class="text-3xl font-bold mb-8">Latest Posts</h1>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div class="bg-white rounded-lg shadow">
                        <img src="https://picsum.photos/500/300" alt="" class="w-full h-64 object-cover rounded-t-lg" />
                        <div class="p-4">
                            <a href="#" class="block text-lg font-semibold mb-2 hover:text-blue-500">Post Title</a>
                            <p class="text-gray-600 leading-relaxed mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus, elit sit amet sodales lacinia, massa ipsum imperdiet purus, vel malesuada velit velit in nisi. Sed eleifend posuere elit, vel suscipit lorem scelerisque a. </p>
                            <a href="#" class="text-blue-500 hover:text-blue-600">Read More</a>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg shadow">
                        <img src="https://picsum.photos/500/300" alt="" class="w-full h-64 object-cover rounded-t-lg" />
                        <div class="p-4">
                            <a href="#" class="block text-lg font-semibold mb-2 hover:text-blue-500">Post Title</a>
                            <p class="text-gray-600 leading-relaxed mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus, elit sit amet sodales lacinia, massa ipsum imperdiet purus, vel malesuada velit velit in nisi. Sed eleifend posuere elit, vel suscipit lorem scelerisque a. </p>
                            <a href="#" class="text-blue-500 hover:text-blue-600">Read More</a>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg shadow">
                        <img src="https://picsum.photos/500/300" alt="" class="w-full h-64 object-cover rounded-t-lg" />
                        <div class="p-4">
                            <a href="#" class="block text-lg font-semibold mb-2 hover:text-blue-500">Post Title</a>
                            <p class="text-gray-600 leading-relaxed mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus, elit sit amet sodales lacinia, massa ipsum imperdiet purus, vel malesuada velit velit in nisi. Sed eleifend posuere elit, vel suscipit lorem scelerisque a. </p>
                            <a href="#" class="text-blue-500 hover:text-blue-600">Read More</a>
                        </div>
                    </div>
                </div>
            </main>
        </>


    )
}
