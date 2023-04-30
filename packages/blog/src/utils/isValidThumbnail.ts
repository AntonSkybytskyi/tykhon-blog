const allowFileType = ["image/jpeg", "image/png", "image/gif", "image/webp"];

export const isValidThumbnail = (thumbnail: File | string): boolean => {
    if (typeof thumbnail === "string") {
        return thumbnail.length > 0;
    }
    if (thumbnail instanceof File) {
        return allowFileType.includes(thumbnail.type);
    }

    return false;
};

export const isValidThumbnailType$ = (thumbnail: File) =>
    allowFileType.includes(thumbnail.type);
