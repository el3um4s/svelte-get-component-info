import { getPropInfo, getPropName, getPropType, getPropDefaultValue } from "../functions/parseProps";

const listTest: Array<{prop: string, expectedName: string, expectedType: string|undefined, expectedDefaultValue:string|undefined}> = [
        {prop:`export let a`, expectedName:"", expectedType:undefined, expectedDefaultValue:undefined},
        {prop:`export let a;`, expectedName:"a", expectedType:undefined, expectedDefaultValue:undefined},
        {prop:`export let a = "ciao";`, expectedName:"a", expectedType:undefined, expectedDefaultValue:"ciao"},
        {prop:`export let a="ciao";`, expectedName:"a", expectedType:undefined, expectedDefaultValue:"ciao"},
        {prop:`export let a ="ciao";`, expectedName:"a", expectedType:undefined, expectedDefaultValue:"ciao"},
        {prop:`export let a= "ciao";`, expectedName:"a", expectedType:undefined, expectedDefaultValue:"ciao"},
        {prop:`export let a:string;`, expectedName:"a", expectedType:"string", expectedDefaultValue:undefined},
        {prop:`export let a : string;`, expectedName:"a", expectedType:"string", expectedDefaultValue:undefined},
        {prop:`export let a: string;`, expectedName:"a", expectedType:"string", expectedDefaultValue:undefined},
        {prop:`export let a :string;`, expectedName:"a", expectedType:"string", expectedDefaultValue:undefined},
        {prop:`export let a:string = "ciao";`, expectedName:"a", expectedType:"string", expectedDefaultValue:"ciao"},
        {prop:`export let a:string="ciao";`, expectedName:"a", expectedType:"string", expectedDefaultValue:"ciao"},
        {prop:`export let a : string = "ciao";`, expectedName:"a", expectedType:"string", expectedDefaultValue:"ciao"},
        {prop:`export let a : string = "ciao; ciao; ciao;";`, expectedName:"a", expectedType:"string", expectedDefaultValue:"ciao; ciao; ciao;"},
        {prop:`export let arr = [1,2,3];`, expectedName:"arr", expectedType:undefined, expectedDefaultValue:"[1,2,3]"},
        {prop:`export let arr = [a, b, c];`, expectedName:"arr", expectedType:undefined, expectedDefaultValue:"[a, b, c]"},
        {prop:`export let arr = ["ciao", "mondo"];`, expectedName:"arr", expectedType:undefined, expectedDefaultValue:`["ciao", "mondo"]`},
        {prop:`export let arr = [";", "mondo"];`, expectedName:"arr", expectedType:undefined, expectedDefaultValue:`[";", "mondo"]`},
        {prop:`export let arr = [":", "mondo"];`, expectedName:"arr", expectedType:undefined, expectedDefaultValue:`[":", "mondo"]`},
        {prop:`export let arr = ["=", "mondo"];`, expectedName:"arr", expectedType:undefined, expectedDefaultValue:`["=", "mondo"]`},
        {prop:`export let arr:Array<number> = [1,2,3];`, expectedName:"arr", expectedType:"Array<number>", expectedDefaultValue:"[1,2,3]"},
        {prop:`export let arr:Array<any> = [a, b, c];`, expectedName:"arr", expectedType:"Array<any>", expectedDefaultValue:"[a, b, c]"},
        {prop:`export let arr:Array<string> = ["ciao", "mondo"];`, expectedName:"arr", expectedType:"Array<string>", expectedDefaultValue:`["ciao", "mondo"]`},
        {prop:`export let arr:Array<string> = [";", "mondo"];`, expectedName:"arr", expectedType:"Array<string>", expectedDefaultValue:`[";", "mondo"]`},
        {prop:`export let arr:Array<string> = [":", "mondo"];`, expectedName:"arr", expectedType:"Array<string>", expectedDefaultValue:`[":", "mondo"]`},
        {prop:`export let arr:Array<string> = ["=", "mondo"];`, expectedName:"arr", expectedType:"Array<string>", expectedDefaultValue:`["=", "mondo"]`},
        {prop: 'export let obj = {a: 0, b: 1};', expectedName:"obj", expectedType:undefined, expectedDefaultValue:"{a: 0, b: 1}"},
        {prop: 'export let obj = {a: 0, b: [1,2,3]};', expectedName:"obj", expectedType:undefined, expectedDefaultValue:"{a: 0, b: [1,2,3]}"},
        {prop: 'export let obj = {a: ":", b: "a"};', expectedName:"obj", expectedType:undefined, expectedDefaultValue:`{a: ":", b: "a"}`},
        {prop: 'export let obj = {a: "=", b: "a"};', expectedName:"obj", expectedType:undefined, expectedDefaultValue:`{a: "=", b: "a"}`},
        {prop: 'export let obj = {a: ";", b: "a"};', expectedName:"obj", expectedType:undefined, expectedDefaultValue:`{a: ";", b: "a"}`},
        {prop: 'export let obj:Object = {a: 0, b: 1};', expectedName:"obj", expectedType:"Object", expectedDefaultValue:`{a: 0, b: 1}`},
        {prop: 'export let obj:Object = {a: 0, b: [1,2,3]};', expectedName:"obj", expectedType:"Object", expectedDefaultValue:`{a: 0, b: [1,2,3]}`},
        {prop: 'export let obj:Object = {a: ":", b: "a"};', expectedName:"obj", expectedType:"Object", expectedDefaultValue:`{a: ":", b: "a"}`},
        {prop: 'export let obj:Object = {a: "=", b: "a"};', expectedName:"obj", expectedType:"Object", expectedDefaultValue:`{a: "=", b: "a"}`},
        {prop: 'export let obj:Object = {a: ";", b: "a"};', expectedName:"obj", expectedType:"Object", expectedDefaultValue:`{a: ";", b: "a"}`},
        {prop: 'export let obj:CustomType = {a: 0, b: 1};', expectedName:"obj", expectedType:"CustomType", expectedDefaultValue:`{a: 0, b: 1}`},
        {prop: 'export let obj:CustomType = {a: 0, b: [1,2,3]};', expectedName:"obj", expectedType:"CustomType", expectedDefaultValue:`{a: 0, b: [1,2,3]}`},
        {prop: 'export let obj:CustomType = {a: ":", b: "a"};', expectedName:"obj", expectedType:"CustomType", expectedDefaultValue:`{a: ":", b: "a"}`},
        {prop: 'export let obj:CustomType = {a: "=", b: "a"};', expectedName:"obj", expectedType:"CustomType", expectedDefaultValue:`{a: "=", b: "a"}`},
        {prop: 'export let obj:CustomType = {a: ";", b: "a"};', expectedName:"obj", expectedType:"CustomType", expectedDefaultValue:`{a: ";", b: "a"}`},
        {prop: 'export let obj:{a:number, b:number} = {a: 0, b: 1};', expectedName:"obj", expectedType:"{a:number, b:number}", expectedDefaultValue:`{a: 0, b: 1}`},
        {prop: 'export let obj:{a:number, b:Array<number>} = {a: 0, b: [1,2,3]};', expectedName:"obj", expectedType:"{a:number, b:Array<number>}", expectedDefaultValue:`{a: 0, b: [1,2,3]}`},
        {prop: 'export let obj:{a:string, b:string} = {a: ":", b: "a"};', expectedName:"obj", expectedType:"{a:string, b:string}", expectedDefaultValue:`{a: ":", b: "a"}`},
        {prop: 'export let obj:{a:string, b:string} = {a: "=", b: "a"};', expectedName:"obj", expectedType:"{a:string, b:string}", expectedDefaultValue:`{a: "=", b: "a"}`},
        {prop: 'export let obj:{a:string, b:string} = {a: ";", b: "a"};', expectedName:"obj", expectedType:"{a:string, b:string}", expectedDefaultValue:`{a: ";", b: "a"}`},
    ];

describe("Parse Svelte - PROPS - get informations", () => {
    test.each(listTest)(`get prop name("$prop") => $expectedName`, ({prop, expectedName}) => {
        const nameProp: string = getPropName(prop);
        expect(nameProp).not.toBeNull();
        expect(nameProp).not.toBeUndefined();
        expect(nameProp).toBe(expectedName);
    });

    test.each(listTest)(`get prop type("$prop") => $expectedType`, ({prop, expectedType}) => {
        const typeProp: string | undefined = getPropType(prop);
        expect(typeProp).not.toBeNull();
        expect(typeProp).toBe(expectedType);
    });

    test.each(listTest)(`get prop type("$prop") => $expectedDefaultValue`, ({prop, expectedDefaultValue}) => {
        const defaultProp: string | undefined = getPropDefaultValue(prop);
        expect(defaultProp).toBe(expectedDefaultValue);
    });

    test.each(listTest)(`get props ("$prop")`, ({prop, expectedName, expectedType, expectedDefaultValue}) => {
        const { name, type, defaultValue } = getPropInfo(prop);
        expect(name).toBe(expectedName);
        expect(type).toBe(expectedType);
        expect(defaultValue).toBe(expectedDefaultValue);
    });
});