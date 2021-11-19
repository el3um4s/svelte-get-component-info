import { getActionName } from "../functions/parseActions";

const listTest: Array<{text: string, expectedAction:string}> = [
    { text: `'notify'`, expectedAction: `notify`},
    { text: ` 'message'`, expectedAction: `message`},
    { text: `"notify"`, expectedAction: `notify`},
    { text: ` "message"`, expectedAction: `message`},
    { text: '`notify`', expectedAction: `notify`},
    { text: ' `message`', expectedAction: `message`},
    { text: ` 'notify'`, expectedAction: `notify`},
    { text: `  'message'`, expectedAction: `message`},
    { text: ` "notify"`, expectedAction: `notify`},
    { text: `  "message"`, expectedAction: `message`},
    { text: ' `notify`', expectedAction: `notify`},
    { text: '  `message`', expectedAction: `message`},
];

describe("Get actions", () => {
    test.each(listTest)(`Extract action from a text: $text => $expectedAction`, ({text, expectedAction}) => {
        const action: string = getActionName(text);
        expect(action).toBe(expectedAction);
    });
});
