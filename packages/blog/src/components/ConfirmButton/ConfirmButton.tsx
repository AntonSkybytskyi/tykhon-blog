import { Component, JSX, createSignal } from "solid-js";
import Button from "../Button/Button";

type ConfirmProps = {
    onCancel?: () => void;
    onSubmit?: () => void;
    children: JSX.Element;
    submitButtonType?: "button" | "submit" | "reset";
    class?: string;
    disabled?: boolean;
    variant?: "primary" | "secondary" | "danger";
};

const ConfirmButton: Component<ConfirmProps> = (props) => {
    const {
        children,
        class: classList,
        submitButtonType = "submit",
        onCancel,
        onSubmit,
        disabled,
        variant,
    } = props;
    const [isConfirmVisible, setConfirmVisible] = createSignal(false);

    const toggleVisibility = () => {
        setConfirmVisible((prev) => !prev);
    };

    const handleAccept = () => {
        onSubmit?.();
        toggleVisibility();
    };

    const handleClose = () => {
        onCancel?.();
        toggleVisibility();
    };

    return (
        <>
            {/* data-modal-target="popup-modal"
            data-modal-toggle="popup-modal" */}
            <Button
                class={classList}
                variant={variant}
                type="button"
                onClick={toggleVisibility}
                disabled={disabled}
            >
                {children}
            </Button>

            <div
                id="popup-modal"
                tabindex="-1"
                class="flex fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center bg-gray-600 bg-opacity-60"
                classList={{ ["hidden"]: !isConfirmVisible() }}
            >
                <div class="relative w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg ">
                        <button
                            type="button"
                            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                            data-modal-hide="popup-modal"
                            onClick={handleClose}
                        >
                            <svg
                                aria-hidden="true"
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                        <div class="p-6 text-center">
                            <svg
                                aria-hidden="true"
                                class="mx-auto mb-4 text-gray-400 w-14 h-14 "
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                            <h3 class="mb-5 text-lg font-normal text-gray-500">
                                Are you sure you want to delete this post?
                            </h3>
                            {/* data-modal-hide="popup-modal" */}
                            <Button
                                variant="danger"
                                type={submitButtonType}
                                class="px-5 py-2.5 mr-2"
                                onClick={handleAccept}
                            >
                                Yes, I'm sure
                            </Button>
                            {/* data-modal-hide="popup-modal" */}
                            <Button
                                variant="outline"
                                type="button"
                                class="px-5 py-2.5"
                                onClick={handleClose}
                            >
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmButton;
