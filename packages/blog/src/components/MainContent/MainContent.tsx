import { Component, JSX } from "solid-js";

interface MainContentProps {
    children: JSX.Element;
}
const MainContent: Component<MainContentProps> = ({ children }) => {
    return (
        <main class="container mx-auto px-4 my-8 flex-grow">
            {children}
        </main>
    )
};


export default MainContent;