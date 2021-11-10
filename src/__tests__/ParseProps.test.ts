import { readFileSvelte } from "../functions/readFileSvelte";
import { getProps_asInFile } from "../functions/parseFileSvelte";
import { getPropInfo, getPropName, getPropType } from "../functions/parseProps";
import type { Content } from "../functions/interfaces";


const listFiles = {
    component_JS: "src/__tests__/test_files/component_simple_js.svelte",
    component_TS: "src/__tests__/test_files/component_simple_ts.svelte",
    component_NO_SCRIPT: "src/__tests__/test_files/component_simple_no_script.svelte",
    component_MULTI: "src/__tests__/test_files/component_multi_props.svelte"
};

const listTest: Array<{prop: string, expectedName: string, expectedType: string}> = [
        {prop:`export let a;`, expectedName:"a", expectedType:""},
        {prop:`export let a = "ciao";`, expectedName:"a", expectedType:""},
        {prop:`export let a="ciao";`, expectedName:"a", expectedType:""},
        {prop:`export let a ="ciao";`, expectedName:"a", expectedType:""},
        {prop:`export let a= "ciao";`, expectedName:"a", expectedType:""},
        {prop:`export let a:string;`, expectedName:"a", expectedType:"string"},
        {prop:`export let a : string;`, expectedName:"a", expectedType:"string"},
        {prop:`export let a: string;`, expectedName:"a", expectedType:"string"},
        {prop:`export let a :string;`, expectedName:"a", expectedType:"string"},
        {prop:`export let a:string = "ciao";`, expectedName:"a", expectedType:"string"},
        {prop:`export let a:string="ciao";`, expectedName:"a", expectedType:"string"},
        {prop:`export let a : string = "ciao";`, expectedName:"a", expectedType:"string"},
        {prop:`export let arr = [1,2,3];`, expectedName:"arr", expectedType:""},
        {prop:`export let arr = [a, b, c];`, expectedName:"arr", expectedType:""},
        {prop:`export let arr = ["ciao", "mondo"];`, expectedName:"arr", expectedType:""},
        {prop:`export let arr = [";", "mondo"];`, expectedName:"arr", expectedType:""},
        {prop:`export let arr = [":", "mondo"];`, expectedName:"arr", expectedType:""},
        {prop:`export let arr = ["=", "mondo"];`, expectedName:"arr", expectedType:""},
        {prop:`export let arr:Array<number> = [1,2,3];`, expectedName:"arr", expectedType:"Array<number>"},
        {prop:`export let arr:Array<any> = [a, b, c];`, expectedName:"arr", expectedType:"Array<any>"},
        {prop:`export let arr:Array<string> = ["ciao", "mondo"];`, expectedName:"arr", expectedType:"Array<string>"},
        {prop:`export let arr:Array<string> = [";", "mondo"];`, expectedName:"arr", expectedType:"Array<string>"},
        {prop:`export let arr:Array<string> = [":", "mondo"];`, expectedName:"arr", expectedType:"Array<string>"},
        {prop:`export let arr:Array<string> = ["=", "mondo"];`, expectedName:"arr", expectedType:"Array<string>"},
        {prop: 'export let obj = {a: 0, b: 1};', expectedName:"obj", expectedType:""},
        {prop: 'export let obj = {a: 0, b: [1,2,3]};', expectedName:"obj", expectedType:""},
        {prop: 'export let obj = {a: ":", b: "a"};', expectedName:"obj", expectedType:""},
        {prop: 'export let obj = {a: "=", b: "a"};', expectedName:"obj", expectedType:""},
        {prop: 'export let obj = {a: ";", b: "a"};', expectedName:"obj", expectedType:""},
        {prop: 'export let obj:Object = {a: 0, b: 1};', expectedName:"obj", expectedType:"Object"},
        {prop: 'export let obj:Object = {a: 0, b: [1,2,3]};', expectedName:"obj", expectedType:"Object"},
        {prop: 'export let obj:Object = {a: ":", b: "a"};', expectedName:"obj", expectedType:"Object"},
        {prop: 'export let obj:Object = {a: "=", b: "a"};', expectedName:"obj", expectedType:"Object"},
        {prop: 'export let obj:Object = {a: ";", b: "a"};', expectedName:"obj", expectedType:"Object"},
        {prop: 'export let obj:CustomType = {a: 0, b: 1};', expectedName:"obj", expectedType:"CustomType"},
        {prop: 'export let obj:CustomType = {a: 0, b: [1,2,3]};', expectedName:"obj", expectedType:"CustomType"},
        {prop: 'export let obj:CustomType = {a: ":", b: "a"};', expectedName:"obj", expectedType:"CustomType"},
        {prop: 'export let obj:CustomType = {a: "=", b: "a"};', expectedName:"obj", expectedType:"CustomType"},
        {prop: 'export let obj:CustomType = {a: ";", b: "a"};', expectedName:"obj", expectedType:"CustomType"},
        {prop: 'export let obj:{a:number, b:number} = {a: 0, b: 1};', expectedName:"obj", expectedType:"{a:number, b:number}"},
        {prop: 'export let obj:{a:number, b:Array<number>} = {a: 0, b: [1,2,3]};', expectedName:"obj", expectedType:"{a:number, b:Array<number>}"},
        {prop: 'export let obj:{a:string, b:string} = {a: ":", b: "a"};', expectedName:"obj", expectedType:"{a:string, b:string}"},
        {prop: 'export let obj:{a:string, b:string} = {a: "=", b: "a"};', expectedName:"obj", expectedType:"{a:string, b:string}"},
        {prop: 'export let obj:{a:string, b:string} = {a: ";", b: "a"};', expectedName:"obj", expectedType:"{a:string, b:string}"},
    ];

describe("Parse Svelte - PROPS - get informations", () => {
    test.each(listTest)(`get prop name("$prop") => $expectedName`, ({prop, expectedName}) => {
        const nameProp: string = getPropName(prop);
        expect(nameProp).not.toBeNull();
        expect(nameProp).not.toBeUndefined();
        expect(nameProp).not.toBe("");
        expect(nameProp).toBe(expectedName);
    });

    test.each(listTest)(`get prop type("$prop") => $expectedType`, ({prop, expectedType}) => {
        const typeProp: string = getPropType(prop);
        expect(typeProp).not.toBeNull();
        expect(typeProp).not.toBeUndefined();
        expect(typeProp).toBe(expectedType);
    });
});