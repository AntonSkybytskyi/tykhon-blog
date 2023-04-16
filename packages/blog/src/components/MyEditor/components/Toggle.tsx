import { Component, JSX } from "solid-js";

interface ToggleProps {
    children: JSX.Element;
    onChange: () => void;
    active: () => boolean;
    class?: string;
    title?: string;
}

const Toogle: Component<ToggleProps> = ({ active, children, onChange, class: className = "", title }) => {
    return <button
        type="button"
        onClick={onChange}
        class={`${className} w-6 h-6 flex items-center justify-center rounded focus:outline-none focus-visible:ring focus-visible:ring-purple-400 focus-visible:ring-opacity-75`}
        classList={{ "text-color-600 bg-white bg-opacity-25": active() }}
        title={title}
    >
        {children}
    </button>
}

export default Toogle;