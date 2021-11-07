import { readFileSvelte, checkFileExist } from "../functions/readFileSvelte";
import type { Content } from "../functions/interfaces";

const listFiles = {
    "_test_root": "README.md",
    "_test_root_no_exist": "_test_root_no_exist",
    "_test_in_folder": "src/index.ts",
    "_test_file_void": "src/__tests__/test_files/file_void",
    "_test_file_1_line": "src/__tests__/test_files/file_hello_world"
}; 


describe('Read files', () => {
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
});

describe("Get content as object", () => {
    test('content cannot be null', () => {
        const file: Content = readFileSvelte(listFiles._test_root);
        expect(file).not.toBeNull();
        expect(file).not.toBeUndefined();
    });

    test('file exist', () => {
        const file: Content = readFileSvelte(listFiles._test_root);
        expect(file).toHaveProperty("content");
        expect(file).toHaveProperty("error");
    });

    test('file not exist', () => {
        const file: Content = readFileSvelte(listFiles._test_root_no_exist);
        expect(file).toHaveProperty("content");
        expect(file).toHaveProperty("error");
    });
});

describe("Check content", () => {
    test('error file not exist', () => {
        const file: Content = readFileSvelte(listFiles._test_root_no_exist);
        expect(file.error.status).toBeTruthy();
        expect(file.error.content).toBe(`File "${listFiles._test_root_no_exist}" not exist`);
        expect(file.content.status).toBeFalsy();
        expect(file.content.content).toBe("");
    });

    test('read file: void', () => {
        const file: Content = readFileSvelte(listFiles._test_file_void);
        expect(file.error.status).toBeFalsy();
        expect(file.error.content).toBe("");
        expect(file.content.status).toBeTruthy();
        expect(file.content.content).toBe("");
    });

    test('read file: content', () => {
        const file: Content = readFileSvelte(listFiles._test_file_1_line);
        expect(file.error.status).toBeFalsy();
        expect(file.error.content).toBe("");
        expect(file.content.status).toBeTruthy();
        expect(file.content.content).toBe("Hello World");
    });
});
