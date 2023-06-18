import { Component, JSX } from "solid-js";
import { Title as SolidTitle } from "solid-start";

const Title: Component<{ children?: JSX.Element }> = ({ children }) => (
    <SolidTitle>
        {children ? `${children} | Tykhonravova Blog` : "Tykhonravova Blog"}
    </SolidTitle>
);

export default Title;
