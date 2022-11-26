import { Languages } from "@rivascva/react-native-code-editor/lib/typescript/languages";

export const getExtensionFromFilePath = (path: string) : string => {
    const imageExtensionArr = path.split('.');
    const imageExtension = imageExtensionArr[imageExtensionArr.length - 1];
    return imageExtension;
}

export const shareGithubLink = 'https://github.com/moatasemyakhni/codecam';

export const linkedInLink = 'http://linkedin.com/in/moatasem-yakhni-2b62b922b';


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

export const editorSupportedLanguages: Array<Languages> = [
    'javascript',
    'python',
    'python',
    'c',
    'cpp',
    'csharp',
    'java',
    'php'
];

export const emailFormat = (value:string): Array<any> | null => {
    const expression = /^(\w([\.-]?\w)*)+@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return value.match(expression);
}

export const comparePasswords = (pwd: string, pwdConfirm: string) : boolean => pwd.trim() === pwdConfirm.trim();

export const passwordStrength = (pwd: string) : boolean => pwd.trim().length >= 6 && pwd.trim().length < 64;

export const validName = (name: string) : boolean => name.trim().length>=3 && name.trim().length < 25;