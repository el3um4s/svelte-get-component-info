import type { Prop } from "./interfaces";

const regex = {
        // name:  /let[\s\S]*?[:|;|=]/gi,
        name: /(?<=let )(.*?)(?=\s|;|=|:)/,
        type: /(?<=let [S:]|[Ss:])(.*?)(?=;|=)/
};


function getPropInfo(s:string):Prop {
    const name = getPropName(s);
    return {name};
}

function getPropName(s:string):string {
    const nameRegex = s.match(regex.name);
    const nameWithDelimiters = nameRegex ? nameRegex[0] : "";
    const name = nameWithDelimiters.replace("let","").replace(/[:|;|=]/gi,"").trim();
    return name;
}

function getPropType(s:string):string {
    const typeRegex = s.match(regex.type);
    const positionEquals = s.indexOf("=");
    const positionSemicolon = s.indexOf(";");
    const firstDelimiters:number = positionEquals > -1 ? positionEquals : positionSemicolon;
    const positionRegex:number = typeRegex ? typeRegex?.index ? typeRegex.index : -1 : -1;
    const type = positionRegex < firstDelimiters ? typeRegex ? typeRegex[0].trim() : "" : "";
    return type;
}

function getPropDefaultValue(s:string):string {
    const positionEquals = s.indexOf("=");
    
}

export {getPropInfo, getPropName, getPropType, getPropDefaultValue};