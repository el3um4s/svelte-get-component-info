import type { Reading } from "./interfaces";

const regex = {
        script: /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
        scriptJS: /<script>[\s\S]*?<\/script>/gi,
        scriptTS: /<script lang="ts">[\s\S]*?<\/script>/gi,
        propsGeneric: new RegExp(`export let (.*?);`, `gm`)
};

function getProps (component:string): Array<string> | null {
    
    if (hasScriptJS(component)) {
        return regex.scriptJS.exec(component);
    } else if (hasScriptTS(component)) {
        return regex.scriptTS.exec(component);
    }
    return null;
}


function hasScript (component:string): Reading {
    const script = component.match(regex.script);
    const result: Reading = {
        status: script == null ? false : true,
        content: script == null ? "": script[0]
    };
    return result;
}

function hasScriptJS (component:string):boolean {
    const script = component.match(regex.scriptJS);
    return script == null ? false : true;
}

function hasScriptTS (component:string):boolean {
    const script = component.match(regex.scriptTS);
    return script == null ? false : true;
}

function hasScriptJSorTS (component:string):boolean {
    const scriptTS = component.match(regex.scriptTS);
    const scriptJS = component.match(regex.scriptJS);
    return scriptTS == null && scriptJS == null ? false : true;
}

export {getProps, hasScript, hasScriptJSorTS, hasScriptJS, hasScriptTS};