import { readFileSvelte} from "../functions/readFileSvelte";
import { hasScript } from "../functions/parseFileSvelte";
import { getAST } from "../functions/parseScript";

import type { Content } from "../functions/interfaces";

const listFiles = {
    component_JS: "src/__tests__/test_files/component_simple_js.svelte",
    component_TS: "src/__tests__/test_files/component_simple_ts.svelte",
    component_NO_SCRIPT: "src/__tests__/test_files/component_simple_no_script.svelte",
    component_MULTI: "src/__tests__/test_files/component_multi_props.svelte"
};


describe("Parse Svelte - SCRIPTS - Get Content", () => {
    test("get AST as object", () => {
        const file: Content = readFileSvelte(listFiles.component_JS);
        const content: string = file.content.content;
        const script:string = hasScript(content).content;
        const ast = getAST(script);
        console.log(ast);
    });
});