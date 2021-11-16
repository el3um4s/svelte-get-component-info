import type { Prop } from "./interfaces";
import { isStringType, getStringWithoutQuote } from "./utils";

const regex = {
        name: /(?<=let )(.*?)(?=\s|;|=|:)/,
        type: /(?<=let [:]|[:])(.*?)(?=;|=)/
};

function getPropInfo(s:string):Prop {
    const name:string = getPropName(s);
    const type:string|undefined = getPropType(s);
    const defaultValue:string|undefined = getPropDefaultValue(s);
    return {name, type, defaultValue};
}

function getPropName(s:string):string {
    const nameRegex = s.match(regex.name);
    const nameWithDelimiters = nameRegex ? nameRegex[0] : "";
    const name = nameWithDelimiters.replace("let","").replace(/[:|;|=]/gi,"").trim();
    return name;
}

function getPropType(s:string):string|undefined {
    const typeRegex = s.match(regex.type);
    const positionEquals = s.indexOf("=");
    const positionSemicolon = s.indexOf(";");
    const firstDelimiters:number = positionEquals > -1 ? positionEquals : positionSemicolon;
    const positionRegex:number = typeRegex?.index ? typeRegex.index : -1;
    const type:string|undefined = positionRegex < firstDelimiters && typeRegex ? typeRegex[0].trim() : undefined;
    return type;
}

function getPropDefaultValue(s:string):string|undefined {
    const positionEquals = s.indexOf("=");
    const positionSemicolon = s.lastIndexOf(";");
    const defaultValue:string|undefined = positionEquals < 0 ? undefined : s.substring(positionEquals+1, positionSemicolon).trim();
    const result: string|undefined= defaultValue && isStringType(defaultValue) ? getStringWithoutQuote(defaultValue) : defaultValue;
    return result;
}

export {getPropInfo, getPropName, getPropType, getPropDefaultValue};