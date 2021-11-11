import {isStringType, getStringWithoutQuote} from "../functions/utils";

const listTest = [
    {string: `ciao`, isString: false, expcted: `ciao` },
    {string: `1 2 3`, isString: false, expcted: `1 2 3` },
    {string: `1 "2" 3`, isString: false, expcted: `1 "2" 3` },
    {string: ``, isString: false, expcted: `` },
    {string: `""`, isString: true, expcted: `` },
    {string: `''`, isString: true, expcted: `` },
    {string: "``", isString: true, expcted: `` },
    {string: `""    `, isString: true, expcted: `` },
    {string: `''    `, isString: true, expcted: `` },
    {string: "``    ", isString: true, expcted: `` },
    {string: `"     "`, isString: true, expcted: `     ` },
    {string: `'     '`, isString: true, expcted: `     ` },
    {string: "`     `", isString: true, expcted: `     ` },
    {string: `"hello world"`, isString: true, expcted: `hello world` },
    {string: `'hello world'`, isString: true, expcted: `hello world` },
    {string: "`hello world`", isString: true, expcted: `hello world` },
    {string: `"hello world"    `, isString: true, expcted: `hello world` },
    {string: `'hello world'    `, isString: true, expcted: `hello world` },
    {string: "`hello world`    ", isString: true, expcted: `hello world` },
    {string: `"   hello world   "`, isString: true, expcted: `   hello world   ` },
    {string: `'   hello world   '`, isString: true, expcted: `   hello world   ` },
    {string: "`   hello world   `", isString: true, expcted: `   hello world   ` },
];

describe("test utility functions", () => {
    
    test.each(listTest)(`get prop isStringType("$string") => $isString`, ({string, isString}) => {
        const result: boolean = isStringType(string);
        expect(result).toBe(isString);
    });

    test.each(listTest)(`get prop getStringWithoutQuote("$string") => $expcetedResult`, ({string, expcted}) => {
        const isString: boolean = isStringType(string);
        const result: string = isString ? getStringWithoutQuote(string) : string;
        expect(result).toBe(expcted);
    });
});