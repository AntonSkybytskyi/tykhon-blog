const allowFileType = ["image/jpeg", "image/png", "image/gif", "image/webp"];

export const isValidThumbnail = (thumbnail: File | string | null): boolean => {
    return (
        typeof thumbnail === null ||
        (typeof thumbnail === "string" && thumbnail.length > 0) ||
        (thumbnail instanceof File && allowFileType.includes(thumbnail.type))
    );
};
