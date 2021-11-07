import { readFileSvelte } from "../functions/readFileSvelte";
import { getProps, hasScriptJS, hasScriptTS, hasScript } from "../functions/parseFileSvelte";
import type { Content,Reading } from "../functions/interfaces";


const listFiles = {
    component_JS: "src/__tests__/test_files/component_js.svelte",
    component_TS: "src/__tests__/test_files/component_ts.svelte"
};

describe("Parse Svelte - Check Scripts", () => {
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
});

