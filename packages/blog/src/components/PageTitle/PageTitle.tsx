import { Component, JSX } from "solid-js";

type PageTitleProps = {
    children: JSX.Element;
};

const PageTitle: Component<PageTitleProps> = ({ children }) => {
    return <h1 class="text-3xl font-bold mb-8">{children}</h1>;
};

export default PageTitle;
