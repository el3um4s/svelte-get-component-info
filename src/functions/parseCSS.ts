import type { CSS } from "./interfaces";

function getCSSInfo(s:string):CSS {
    const name:string = getCSSName(s);
    return {name};
}

function getCSSName(s:string):string {
    return s.trim();
}

export { getCSSInfo, getCSSName };