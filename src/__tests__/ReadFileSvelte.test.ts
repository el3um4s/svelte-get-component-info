import { readFileSvelte, checkFileExist } from "../functions/readFileSvelte";

const listFiles = {
    "_test_root": "README.md",
    "_test_root_no_exist": "_test_root_no_exist",
    "_test_in_folder": "src/index.ts"
}; 


describe('read files', () => {
    test('file exist - root: true', () => {
        const exist = checkFileExist(listFiles._test_root);
        expect(exist).toBeTruthy();
    });

    test('file exist - root (lower case): true', () => {
        const exist = checkFileExist(listFiles._test_root.toLowerCase());
        expect(exist).toBeTruthy();
    });

    test('file exist - root (upper case): true', () => {
        const exist = checkFileExist(listFiles._test_root.toUpperCase());
        expect(exist).toBeTruthy();
    });

    test('file exist - root: false', () => {
        const exist = checkFileExist(listFiles._test_root_no_exist);
        expect(exist).toBeFalsy();
    });

    test('file exist - with path: true', () => {
        const exist = checkFileExist(listFiles._test_in_folder);
        expect(exist).toBeTruthy();
    });

    test('file exist - with path: false', () => {
        const exist = checkFileExist(listFiles._test_in_folder + ".file_not_exist");
        expect(exist).toBeFalsy();
    });

    test('get content - root', () => {
        const file = readFileSvelte(listFiles._test_root);
        expect(file).not.toBeNull();
        expect(file).not.toBeUndefined();
    });

    test('get content as object', () => {
        const file = readFileSvelte(listFiles._test_root);
        expect(file).toHaveProperty("content");
        expect(file).toHaveProperty("error");
    });
});

