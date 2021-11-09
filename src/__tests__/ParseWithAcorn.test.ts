import { readFileSvelte} from "../functions/readFileSvelte";
import { hasScript } from "../functions/parseFileSvelte";
import { getAST, getArryOfExportedNameDeclaration } from "../functions/parseScript";

import type { Content } from "../functions/interfaces";

const listFiles = {
    component_JS: "src/__tests__/test_files/component_simple_js.svelte",
    component_TS: "src/__tests__/test_files/component_simple_ts.svelte",
    component_NO_SCRIPT: "src/__tests__/test_files/component_simple_no_script.svelte",
    component_MULTI: "src/__tests__/test_files/component_multi_props.svelte"
};


describe("Parse Svelte - SCRIPTS - Get Content", () => {
    test("get AST as acorn.Node", () => {
        const file: Content = readFileSvelte(listFiles.component_JS);
        const content: string = file.content.content;
        const script:string = hasScript(content).content;
        const ast:acorn.Node = getAST(script);
        expect(ast).not.toBeUndefined();
        const props:Array<acorn.Node> = getArryOfExportedNameDeclaration(ast);
        expect(props).not.toBeUndefined();
    });

    test.skip("get name a props (JS)", () => {
        const file: Content = readFileSvelte(listFiles.component_JS);
        const content: string = file.content.content;
        const script:string = hasScript(content).content;
        const ast:acorn.Node = getAST(script);
        const propsAsNode:Array<acorn.Node> = getArryOfExportedNameDeclaration(ast);
        console.log(propsAsNode);
        console.log(propsAsNode[0]);
        // const prop = convertExportedNameToObject(propsAsNode[0]);
        // expect(prop).not.toBeUndefined();
    });

    test("get name a props (TS)", () => {
        const file: Content = readFileSvelte(listFiles.component_TS);
        const content: string = file.content.content;
        const script:string = hasScript(content).content;
        const ast:acorn.Node = getAST(script);
        console.log(ast);
        // const prop = convertExportedNameToObject(propsAsNode[0]);
        // expect(prop).not.toBeUndefined();
    });
});