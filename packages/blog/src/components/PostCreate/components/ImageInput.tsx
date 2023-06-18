import { Component, createSignal } from "solid-js";
import { isValidThumbnail } from "~/utils/isValidThumbnail";

type ImageInputProps = {
    name: string;
    fileInputName: string;
    thumbnail?: string;
};

const ImageInput: Component<ImageInputProps> = ({
    name,
    fileInputName,
    thumbnail = "",
}) => {
    const [currentImage, setCurrentImage] = createSignal(thumbnail);

    const onCoverImageChange = (event: any) => {
        const [file] = event.target.files;
        if (file && isValidThumbnail(file)) {
            setCurrentImage(URL.createObjectURL(file));
        }
    };

    return (
        <>
            <label for="thumbnail" class="block text-gray-700 font-bold mb-2">
                Cover Image
            </label>

            <div class="flex items-center justify-center w-full">
                <input
                    id="dropzone-file"
                    name={fileInputName}
                    type="file"
                    class="hidden"
                    onChange={onCoverImageChange}
                />
                <input type="hidden" name={name} value={currentImage()} />
                {!!currentImage() && (
                    <div class="inline-block relative">
                        <img src={currentImage() as string} alt="" />
                        <button
                            type="button"
                            class="bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 absolute top-1 right-1"
                            aria-label="Delete"
                            onClick={() => setCurrentImage("")}
                        >
                            <span class="sr-only">Delete</span>
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
                        </button>
                    </div>
                )}
                {!currentImage() && (
                    <label
                        for="dropzone-file"
                        class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                                aria-hidden="true"
                                class="w-10 h-10 mb-3 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                ></path>
                            </svg>
                            <p class="mb-2 text-sm text-gray-500">
                                <span class="font-semibold">
                                    Click to upload
                                </span>{" "}
                                or drag and drop
                            </p>
                            <p class="text-xs text-gray-500">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                        </div>
                    </label>
                )}
            </div>
        </>
    );
};

export default ImageInput;
