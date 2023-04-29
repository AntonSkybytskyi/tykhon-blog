import { Component, JSX } from "solid-js";
import { useIsRouting } from "solid-start";

interface MainContentProps {
    children: JSX.Element;
}
const MainContent: Component<MainContentProps> = ({ children }) => {
    const isRouting = useIsRouting();

    return (
        <main class="container mx-auto px-4 my-8 flex-grow">
            {children}
            {isRouting() && (
                <div class="fixed z-50 inset-0 bg-white opacity-75 flex justify-center items-center" />
            )}
        </main>
    );
};

export default MainContent;
