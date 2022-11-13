
export const getExtensionFromFilePath = (path) => {
    const imageExtensionArr = path.split('.');
    const imageExtension = imageExtensionArr[imageExtensionArr.length - 1];
    return imageExtension;
}

export const allowedProgrammingLanguages = [
    {label: 'JAVASCRIPT', value: 'JAVASCRIPT_NODE'},
    {label: 'PYTHON2', value: 'PYTHON2'},
    {label: 'PYTHON3', value: 'PYTHON3'},
    {label: 'C', value: 'C'}, 
    {label: 'C++', value: 'CPP14'}, 
    {label: 'C#', value: 'CSHARP'},
    {label: 'JAVA', value: 'JAVA8'},
    {label: 'PHP', value: 'PHP'},
];