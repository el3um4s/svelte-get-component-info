function isStringType(s:string):boolean {
    const startString: string = s.trim();
    const firstChar: string = startString.charAt(0);
    const lastChar: string = startString.charAt(startString.length-1);
    const charIsQuote = firstChar === `"` || firstChar ===`'` || firstChar === "`";
    const result = charIsQuote && firstChar === lastChar;
    return result;
}

function getStringWithoutQuote(s:string):string {
    const startString: string = s.trim();
    const result: string = startString.substring(1,startString.length-1);
    return result;
}

export {isStringType, getStringWithoutQuote};