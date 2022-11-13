
export const getExtenstionFromFilePath = (path) => {
    const imageExtensionArr = path.split('.');
    const imageExtension = imageExtensionArr[imageExtensionArr.length - 1];
    return imageExtension;
}
