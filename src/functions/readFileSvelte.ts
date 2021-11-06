import { existsSync, readFileSync  } from 'fs';
import { toTry } from "@el3um4s/to-try";


interface Content {
    error: Reading;
    content: Reading;
}

interface Reading {
    status: boolean;
    content: string;
}

function readFileSvelte(nameFile:string) {
    const content:Content = {
        error: {
            status: true,
            content: "file not read"
        },
        content: {
            status: false,
            content: ""
        }
    };

    if (checkFileExist(nameFile)) {

        const [result, error] = toTry(() => readFileSync(nameFile));

        if (error || result == null) {
            content.error.content = `Error reading the file "${nameFile}"`;
        } else {
            const contentString = result.toString();
            content.error = {
                status: false,
                content: ""
            };
            content.content = {
                status: true,
                content: contentString
            };
        }

    } else {
        content.error.content = "File not exist";
    }

    
    
    return content;
}


function checkFileExist(nameFile:string):boolean {
    return existsSync(nameFile);
}

export {readFileSvelte, checkFileExist};