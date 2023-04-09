// @refresh reload
import { Suspense } from "solid-js";
import {
  useLocation,
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";

export default function Root() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";
  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - With TailwindCSS</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* <Body class="bg-gray-50 text-gray-800 font-sans"> */}
      <Body class="bg-gray-100 flex flex-col min-h-screen">
        <Suspense>
          <ErrorBoundary>
            {/* <nav class="bg-sky-800">
              <ul class="container flex items-center p-3 text-gray-200">
                <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
                  <A href="/">Home</A>
                </li>
                <li class={`border-b-2 ${active("/about")} mx-1.5 sm:mx-6`}>
                  <A href="/about">About</A>
                </li>
                <li class={`border-b-2 ${active("/template")} mx-1.5 sm:mx-6`}>
                  <A href="/template">Template</A>
                </li>
              </ul>
            </nav> */}
            {/* <nav class="bg-white shadow-lg">
              <div class="container mx-auto px-4">
                <div class="flex justify-between items-center py-4">
                  <div>
                    <a href="#" class="text-xl font-bold text-gray-800">My Blog</a>
                  </div>
                  <div>
                    <a href="#" class="text-gray-600 hover:text-gray-800 px-3">Home</a>
                    <a href="#" class="text-gray-600 hover:text-gray-800 px-3">About</a>
                    <a href="#" class="text-gray-600 hover:text-gray-800 px-3">Contact</a>
                  </div>
                </div>
              </div>
            </nav> */}
            <nav class="bg-white py-4 shadow">
              <div class="container mx-auto px-4">
                <a href="#" class="text-lg font-semibold text-gray-800">My Minimalist Blog</a>
              </div>
            </nav>


            <Routes>
              <FileRoutes />
            </Routes>
            <footer class="bg-white py-4">
              <div class="container mx-auto px-4">
                <div class="flex flex-wrap">
                  <div class="w-full md:w-2/3 lg:w-2/3 mb-4 md:mb-0">
                    <h2 class="text-lg font-bold mb-2">About Us</h2>
                    <p class="leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel sodales tellus, vel feugiat dolor. Nullam varius nunc eget lorem tristique tincidunt. Sed auctor eu nulla id ornare.</p>
                  </div>

                  <div class="w-full md:w-1/3 lg:w-1/3 mb-4 md:mb-0">
                    <h2 class="text-lg font-bold mb-2">Contact Us</h2>
                    <p class="leading-relaxed">1234 Some Street, Example City<br />example@example.com<br />+1 (555) 555-5555</p>
                  </div>

                </div>
              </div>
            </footer>
            {/* <footer class=" bg-white py-4 flex-shrink-0">
              <div class="container mx-auto px-4 text-center">
                <p class="text-gray-600">© 2023 My Minimalist Blog. All rights reserved.</p>
              </div>
            </footer> */}
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
