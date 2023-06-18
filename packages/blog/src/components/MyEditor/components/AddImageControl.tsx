import { Component, JSX } from "solid-js";
import Toggle from "./Toggle";


type AddImageControlProps = {
    onSelect: (images: string[]) => void
    children: JSX.Element;
}



const AddImageControl: Component<AddImageControlProps> = ({ onSelect, children }) => {
    const onImageRead = ({ target }: any) => {
        if (target) {
            onSelect([target.result]);
        }
    }
    const onChange = (event: any) => {
        const files = event.target.files as FileList;
        console.log({ files })
        Array.from(files).map((file: File) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            return reader;
        });

        const imageBlobs = Promise.all([])
        // files.each((file) => {
        //     console.log({ file })
        // })

        // const reader = new FileReader();
        // reader.readAsDataURL(file);
        // // reader.onload = ((result: FileReader) => {
        // //     console.log({ image: result. })
        // // })
        // reader.addEventListener("load", onImageRead);
    }

    return (<label for="postImages">
        <input id="postImages" type="file" class="hidden" onChange={onChange} multiple />
        {/* {children} */}
        Images
    </label>);
};

export default AddImageControl;
