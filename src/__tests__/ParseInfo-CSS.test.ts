import { getCSSName } from "../functions/parseCSS";

const listTest: Array<{text: string, expectedCSS:string}> = [
    { text: `--color`, expectedCSS: `--color`},
    { text: ` --color`, expectedCSS: `--color`},
    { text: `--color `, expectedCSS: `--color`},
    { text: ` --color `, expectedCSS: `--color`},
    { text: `--color-red-green`, expectedCSS: `--color-red-green`},
    { text: ` --color-red-green`, expectedCSS: `--color-red-green`},
    { text: `--color-red-green `, expectedCSS: `--color-red-green`},
    { text: ` --color-red-green `, expectedCSS: `--color-red-green`}
];

describe("Get actions", () => {
    test.each(listTest)(`Extract CSS from a text: $text => $expectedCSS`, ({text, expectedCSS}) => {
        const css: string = getCSSName(text);
        expect(css).toBe(expectedCSS);
    });
});
