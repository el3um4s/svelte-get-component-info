import { readFileSvelte } from "../functions/readFileSvelte";
import {
    hasProps, getProps_asInFile,
    hasActions, getActions_asInFile,
    hasSlots, getSlots_asInFile,
    hasCSS, getCSS_asInFile
    } from "../functions/parseFileSvelte";
import type { Content } from "../functions/interfaces";


const listFiles = {
    component_JS: "src/__tests__/test_files/component_simple_js.svelte",
    component_TS: "src/__tests__/test_files/component_simple_ts.svelte",
    component_NO_SCRIPT: "src/__tests__/test_files/component_simple_no_script.svelte",
    component_MULTI: "src/__tests__/test_files/component_multi.svelte"
};

describe("Parse Svelte - Checks Props", () => {
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

describe("Parse Svelte - Checks Actions", () => {
    test("check has actions JS", () => {
        const file: Content = readFileSvelte(listFiles.component_JS);
        const content: string = file.content.content;
        const actions: boolean = hasActions(content);
        expect(actions).toBeTruthy();
        const listActions: string[] = getActions_asInFile(content);
        expect(listActions.length).toBe(1);
        expect(listActions[0].trim()).toBe(`"message"`);
    });

    test("check has actions TS", () => {
        const file: Content = readFileSvelte(listFiles.component_TS);
        const content: string = file.content.content;
        const actions: boolean = hasActions(content);
        expect(actions).toBeTruthy();
        const listActions: string[] = getActions_asInFile(content);
        expect(listActions.length).toBe(1);
        expect(listActions[0].trim()).toBe(`"message"`);
    });

    test("check has actions NO ACTIONS", () => {
        const file: Content = readFileSvelte(listFiles.component_NO_SCRIPT);
        const content: string = file.content.content;
        const actions: boolean = hasActions(content);
        expect(actions).toBeFalsy();
        const listActions: string[] = getActions_asInFile(content);
        expect(listActions.length).toBe(0);
    });

    test("check has actions MULTI", () => {
        const file: Content = readFileSvelte(listFiles.component_MULTI);
        const content: string = file.content.content;
        const actions: boolean = hasActions(content);
        expect(actions).toBeTruthy();
    });

    test("count actions in files", () => {
        const file_js = getActions_asInFile(readFileSvelte(listFiles.component_JS).content.content);
        expect(file_js.length).toBe(1);
        const file_ts = getActions_asInFile(readFileSvelte(listFiles.component_TS).content.content);
        expect(file_ts.length).toBe(1);
        const file_no = getActions_asInFile(readFileSvelte(listFiles.component_NO_SCRIPT).content.content);
        expect(file_no.length).toBe(0);
        const file_multi = getActions_asInFile(readFileSvelte(listFiles.component_MULTI).content.content);
        expect(file_multi.length).toBe(9);
    });
});


describe("Parse Svelte - Checks Slots", () => {
    test("check has slots JS", () => {
        const file: Content = readFileSvelte(listFiles.component_JS);
        const content: string = file.content.content;
        const slots: boolean = hasSlots(content);
        expect(slots).toBeTruthy();
        const listSlots: string[] = getSlots_asInFile(content);
        expect(listSlots.length).toBe(1);
        expect(listSlots[0].trim()).toBe(`<slot />`);
    });

    test("check has slots TS", () => {
        const file: Content = readFileSvelte(listFiles.component_TS);
        const content: string = file.content.content;
        const slots: boolean = hasSlots(content);
        expect(slots).toBeTruthy();
        const listSlots: string[] = getSlots_asInFile(content);
        expect(listSlots.length).toBe(1);
        expect(listSlots[0].trim()).toBe(`<slot />`);
    });

    test("check has slots NO ACTIONS", () => {
        const file: Content = readFileSvelte(listFiles.component_NO_SCRIPT);
        const content: string = file.content.content;
        const slots: boolean = hasSlots(content);
        expect(slots).toBeFalsy();
        const listSlots: string[] = getSlots_asInFile(content);
        expect(listSlots.length).toBe(0);
    });

    test("check has slots MULTI", () => {
        const file: Content = readFileSvelte(listFiles.component_MULTI);
        const content: string = file.content.content;
        const slots: boolean = hasSlots(content);
        expect(slots).toBeTruthy();
    });

    test("count slots in files", () => {
        const file_js = getSlots_asInFile(readFileSvelte(listFiles.component_JS).content.content);
        expect(file_js.length).toBe(1);
        const file_ts = getSlots_asInFile(readFileSvelte(listFiles.component_TS).content.content);
        expect(file_ts.length).toBe(1);
        const file_no = getSlots_asInFile(readFileSvelte(listFiles.component_NO_SCRIPT).content.content);
        expect(file_no.length).toBe(0);
        const file_multi = getSlots_asInFile(readFileSvelte(listFiles.component_MULTI).content.content);
        expect(file_multi.length).toBe(6);
    });
});

describe("Parse Svelte - Checks CSS VARIABLES", () => {
    test("check has CSS VARIABLES JS", () => {
        const file: Content = readFileSvelte(listFiles.component_JS);
        const content: string = file.content.content;
        const css: boolean = hasCSS(content);
        expect(css).toBeTruthy();
        const listCss: string[] = getCSS_asInFile(content);
        expect(listCss.length).toBe(1);
        expect(listCss[0].trim()).toBe(`--color-background`);
    });

    test("check has CSS VARIABLES TS", () => {
        const file: Content = readFileSvelte(listFiles.component_TS);
        const content: string = file.content.content;
        const css: boolean = hasCSS(content);
        expect(css).toBeTruthy();
        const listCss: string[] = getCSS_asInFile(content);
        expect(listCss.length).toBe(1);
        expect(listCss[0].trim()).toBe(`--color-background`);
    });

    test("check has CSS VARIABLES NO VARIABLES", () => {
        const file: Content = readFileSvelte(listFiles.component_NO_SCRIPT);
        const content: string = file.content.content;
        const css: boolean = hasCSS(content);
        expect(css).toBeFalsy();
        const listCss: string[] = getCSS_asInFile(content);
        expect(listCss.length).toBe(0);
    });

    test("check has CSS VARIABLES MULTI", () => {
        const file: Content = readFileSvelte(listFiles.component_MULTI);
        const content: string = file.content.content;
        const slots: boolean = hasCSS(content);
        expect(slots).toBeTruthy();
    });

    test("count CSS VARIABLES in files", () => {
        const file_js = getCSS_asInFile(readFileSvelte(listFiles.component_JS).content.content);
        expect(file_js.length).toBe(1);
        const file_ts = getCSS_asInFile(readFileSvelte(listFiles.component_TS).content.content);
        expect(file_ts.length).toBe(1);
        const file_no = getCSS_asInFile(readFileSvelte(listFiles.component_NO_SCRIPT).content.content);
        expect(file_no.length).toBe(0);
        const file_multi = getCSS_asInFile(readFileSvelte(listFiles.component_MULTI).content.content);
        expect(file_multi.length).toBe(16);
    });
});