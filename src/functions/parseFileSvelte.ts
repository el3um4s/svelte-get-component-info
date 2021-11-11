import type { Reading } from "./interfaces";

const regex = {
        script: /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
        scriptJS: /<script>[\s\S]*?<\/script>/gi,
        scriptTS: /<script lang="ts">[\s\S]*?<\/script>/gi,
        propsGeneric: /export let [\s\S]*?;/gi
};

function hasScript (component:string): Reading {
    const script = component.match(regex.script);
    const content = script == null ? "": script[0].replace(/<script[\s\S]*?>/gi, "").replace(/<\/script>/gi, "");
    const result: Reading = {
        status: script == null ? false : true,
        content
    };
    return result;
}

function hasProps(component:string):boolean {
    const content = component.match(regex.propsGeneric);
    return content != null;
}

function getProps_asInFile (component:string): Array<string> {
    const content = component.match(regex.propsGeneric);
    return content != null ? content : [];
}

export { hasScript, hasProps, getProps_asInFile };