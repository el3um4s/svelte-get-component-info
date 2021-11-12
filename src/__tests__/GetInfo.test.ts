import {getInfo} from "../index";

import {SvelteInformations, Prop} from "../functions/interfaces";

const listFiles = {
    component_JS: "src/__tests__/test_files/component_simple_js.svelte",
    component_TS: "src/__tests__/test_files/component_simple_ts.svelte",
    component_NO_SCRIPT: "src/__tests__/test_files/component_simple_no_script.svelte",
    component_MULTI: "src/__tests__/test_files/component_multi_props.svelte"
};


const listCheckValues: Array<Prop> = [
    {
        name: `string_noType`,
        type: undefined,
        defaultValue: `a - no type`
    },
        {
        name: `string_yesType`,
        type: `string`,
        defaultValue: `a - yes type`
    },
    {
        name: `string_yesType_noValue`,
        type: `string`,
        defaultValue: undefined
    },
    {
        name: `number_noType`,
        type: undefined,
        defaultValue: `1`
    },
    {
        name: `number_yesType`,
        type: `number`,
        defaultValue: `2`
    },
    {
        name: `number_yesType_noValue`,
        type: `number`,
        defaultValue: undefined
    },
    {
        name: `boolean_noType`,
        type: undefined,
        defaultValue: `false`
    },
    {
        name: `boolean_yesType`,
        type: `boolean`,
        defaultValue: `true`
    },
    {
        name: `boolean_yesType_noValue`,
        type: `boolean`,
        defaultValue: undefined
    },
        {
        name: `array_string_noType`,
        type: undefined,
        defaultValue: `["name"]`
    },
        {
        name: `array_string_yesType`,
        type: `Array<string>`,
        defaultValue: `["yes type"]`
    },
    {
        name: `array_string_yesType_noValue`,
        type: `Array<string>`,
        defaultValue: undefined
    },
    {
        name: `array_number_noType`,
        type: undefined,
        defaultValue: `[1, 2, 3]`
    },
    {
        name: `array_number_yesType`,
        type: `Array<number>`,
        defaultValue: `[1, 2, 3]`
    },
    {
        name: `array_number_yesType_noValue`,
        type: `Array<number>`,
        defaultValue: undefined
    },
    {
        name: `object_noType`,
        type: undefined,
        defaultValue: `{ name: "no type" }`
    },
    {
        name: `object_yesType`,
        type: `object`,
        defaultValue: `{ name: "yes type" }`
    },
    {
        name: `object_yesType_noValue`,
        type: `object`,
        defaultValue: undefined
    },
        {
        name: `array_object_noType`,
        type: undefined,
        defaultValue: `[
    { name: "no type" },
    { name: "no type 2" },
    { name: "no type 3" },
  ]`
    },
    {
        name: `array_object_yesType`,
        type: `Array<object>`,
        defaultValue: `[
    { name: "yes type" },
    { name: "yes type 2" },
    { name: "yes type 3" },
  ]`
    },
    {
        name: `array_object_yesType_noValue`,
        type: `Array<object>`,
        defaultValue: undefined
    },
    {
        name: `object_complex_noType`,
        type: undefined,
        defaultValue: `{ name: "no type", value: "complex" }`
    },
    {
        name: `object_complex_yesType`,
        type: `object`,
        defaultValue: `{
    name: "yes type",
    value: "complex",
  }`
    },
    {
        name: `object_complex_yesType_noValue`,
        type: `object`,
        defaultValue: undefined
    },
    {
        name: `object_complex_object_noType`,
        type: undefined,
        defaultValue: `[
    { name: "no type", value: "complex", n: 1 },
    { name: "no type 2", value: "complex", n: 2 },
    { name: "no type 3", value: "complex", n: 3 },
  ]`
    },
    {
        name: `object_complex_object_yesType`,
        type: `object`,
        defaultValue: `[
    { name: "yes type", value: "complex", n: 1 },
    { name: "yes type 2", value: "complex", n: 2 },
    { name: "yes type 3", value: "complex", n: 3 },
  ]`
    },
    {
        name: `object_complex_object_yesType_noValue`,
        type: `object`,
        defaultValue: undefined
    },
        {
        name: `function_noType`,
        type: undefined,
        defaultValue: `() => "no type"`
    },
    {
        name: `function_yesType`,
        type: `Function`,
        defaultValue: `() => "yes type"`
    },
    {
        name: `function_yesType_noValue`,
        type: `Function`,
        defaultValue: undefined
    },
];


describe("Parse svelte files", () => {
    test("parse file with no script", () => {
        const result:SvelteInformations = getInfo(listFiles.component_NO_SCRIPT);
        expect(result.props.length).toBe(0);
    });
    
    test("parse file with only 1 prop (JS)", () => {
        const result:SvelteInformations = getInfo(listFiles.component_JS);
        expect(result.props.length).toBe(1);
    });

    test("parse file with only 1 prop (TS)", () => {
        const result:SvelteInformations = getInfo(listFiles.component_TS);
        expect(result.props.length).toBe(1);
    });

    test("parse file with 30 props (TS)", () => {
        const result:SvelteInformations = getInfo(listFiles.component_MULTI);
        expect(result.props.length).toBe(30);
    });
});

describe("Parse Svelte - check props", () => {
        const result:SvelteInformations = getInfo(listFiles.component_MULTI);
        const props:Array<Prop> = result.props;
        props.forEach((prop:Prop, index:number) => {
            test(`check prop: name=${prop.name} - type=${prop.type}`, () => {
                expect(prop.name).toBe(listCheckValues[index].name);
                expect(prop.type).toBe(listCheckValues[index].type);
                expect(prop.defaultValue?.replace(/(\r\n|\n|\r)/gm, "")).toBe(listCheckValues[index].defaultValue?.trim()?.replace(/(\r\n|\n|\r)/gm, ""));
            });
        });
});