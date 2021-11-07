import { readFileSvelte } from "../functions/readFileSvelte";
import { hasScriptJS, hasScriptTS, hasScript, hasScriptJSorTS, hasProps, getProps_asInFile } from "../functions/parseFileSvelte";
import type { Content } from "../functions/interfaces";


const listFiles = {
    component_JS: "src/__tests__/test_files/component_simple_js.svelte",
    component_TS: "src/__tests__/test_files/component_simple_ts.svelte",
    component_NO_SCRIPT: "src/__tests__/test_files/component_simple_no_script.svelte",
    component_MULTI: "src/__tests__/test_files/component_multi_props.svelte"
};

describe("Parse Svelte - SCRIPTS - Check Scripts", () => {
    test("has script (generic - JS)", () => {
        const file: Content = readFileSvelte(listFiles.component_JS);
        const content: string = file.content.content;
        const hasScriptGeneric: boolean = hasScript(content).status;
        expect(hasScriptGeneric).toBeTruthy();
    });

    test("has script (generic - TS)", () => {
        const file: Content = readFileSvelte(listFiles.component_TS);
        const content: string = file.content.content;
        const hasScriptGeneric: boolean = hasScript(content).status;
        expect(hasScriptGeneric).toBeTruthy();
    });

    test("has script (generic - JS or TS)", () => {
        const file: Content = readFileSvelte(listFiles.component_TS);
        const content: string = file.content.content;
        const hasScriptGeneric: boolean = hasScriptJSorTS(content);
        expect(hasScriptGeneric).toBeTruthy();
    });

    test("has script (JS)", () => {
        const file: Content = readFileSvelte(listFiles.component_JS);
        const content: string = file.content.content;
        expect(hasScriptJS(content)).toBeTruthy();
        expect(hasScriptTS(content)).toBeFalsy();
    });

    test("has script (TS)", () => {
        const file: Content = readFileSvelte(listFiles.component_TS);
        const content: string = file.content.content;
        expect(hasScriptJS(content)).toBeFalsy();
        expect(hasScriptTS(content)).toBeTruthy();
    });

    test("has script (TS)", () => {
        const file: Content = readFileSvelte(listFiles.component_NO_SCRIPT);
        const content: string = file.content.content;
        expect(hasScript(content).status).toBeFalsy();
        expect(hasScriptJSorTS(content)).toBeFalsy();
        expect(hasScriptJS(content)).toBeFalsy();
        expect(hasScriptTS(content)).toBeFalsy();
    });
});


describe("Parse Svelte - SCRIPTS - Get Content", () => {
    test("read content JS", () => {
        const file: Content = readFileSvelte(listFiles.component_JS);
        const content: string = file.content.content;
        const script:string = hasScript(content).content.trim();
        expect(script).toBe("export let propGeneric;");
    });

    test("read content TS", () => {
        const file: Content = readFileSvelte(listFiles.component_TS);
        const content: string = file.content.content;
        const script:string = hasScript(content).content.trim();
        expect(script).toBe("export let propGeneric: string;");
    });

    test("read content NO SCRIPT", () => {
        const file: Content = readFileSvelte(listFiles.component_NO_SCRIPT);
        const content: string = file.content.content;
        const script:string = hasScript(content).content.trim();
        expect(script).toBe("");
    });
});


describe("Parse Svelte - SCRIPTS - Checks Props", () => {
    test("check has props JS", () => {
        const file: Content = readFileSvelte(listFiles.component_JS);
        const content: string = file.content.content;
        const props: boolean = hasProps(content);
        expect(props).toBeTruthy();
        const listProps: string[] = getProps_asInFile(content);
        expect(listProps.length).toBe(1);
        expect(listProps[0].trim()).toBe("export let propGeneric;");
    });

    test("check has props TS", () => {
        const file: Content = readFileSvelte(listFiles.component_TS);
        const content: string = file.content.content;
        const props: boolean = hasProps(content);
        expect(props).toBeTruthy();
        const listProps: string[] = getProps_asInFile(content);
        expect(listProps.length).toBe(1);
        expect(listProps[0].trim()).toBe("export let propGeneric: string;");
    });

    test("check has props NO SCRIPTS", () => {
        const file: Content = readFileSvelte(listFiles.component_NO_SCRIPT);
        const content: string = file.content.content;
        const props: boolean = hasProps(content);
        expect(props).toBeFalsy();
        const listProps: string[] = getProps_asInFile(content);
        expect(listProps.length).toBe(0);
    });

    test("check has props MULTI", () => {
        const file: Content = readFileSvelte(listFiles.component_MULTI);
        const content: string = file.content.content;
        const props: boolean = hasProps(content);
        expect(props).toBeTruthy();
    });

    test("count props in files", () => {
        const file_js = getProps_asInFile(readFileSvelte(listFiles.component_JS).content.content);
        expect(file_js.length).toBe(1);
        const file_ts = getProps_asInFile(readFileSvelte(listFiles.component_TS).content.content);
        expect(file_ts.length).toBe(1);
        const file_no = getProps_asInFile(readFileSvelte(listFiles.component_NO_SCRIPT).content.content);
        expect(file_no.length).toBe(0);
        const file_multi = getProps_asInFile(readFileSvelte(listFiles.component_MULTI).content.content);
        expect(file_multi.length).toBe(30);
    });
});