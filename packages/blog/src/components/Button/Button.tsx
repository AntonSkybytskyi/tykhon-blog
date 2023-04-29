import { Component, JSX } from "solid-js";
import { A } from "solid-start";

type ButtonProps = {
    variant?: "primary" | "secondary" | "danger" | "outline" | "success";
    disabled?: boolean;
    type?: "submit" | "button" | "reset";
    children: JSX.Element;
    class?: string;
    onClick?: () => void;
    href?: string;
}

const Button: Component<ButtonProps> = ({ variant = "primary", disabled, type = "button", class: customClass = "", onClick, href, children }) => {
    const classList = {
        ["bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:shadow-outline"]: variant === "primary",
        ["bg-slate-600 text-white hover:bg-slate-600"]: variant === "secondary",
        ["bg-red-500 hover:bg-red-700 text-white dark:bg-red-600 dark:hover:bg-red-700"]: variant === "danger",
        ["text-gray-500 bg-white hover:bg-gray-100 border border-gray-200 hover:text-gray-900"]: variant === "outline",
        ["bg-green-600 hover:bg-green-900 disabled:bg-green-300 disabled:cursor-not-allowed text-white"]: variant === "success",
    }

    if (href !== undefined) {
        return <A href={href} classList={classList} class={`py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed ${customClass}`}>
            {children}
        </A>
    }

    return <button
        type={type}
        classList={classList}
        class={`py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed ${customClass}`}
        disabled={disabled}
        onClick={onClick}
    >
        {children}
    </button >
}

export default Button;