import { getSlotName, isSlotAnonymous } from "../functions/parseSlots";

const listTest: Array<{text: string, expectedSlotName:string | undefined, anonymousSlot:boolean}> = [
    { text: `<slot name="header">`, expectedSlotName: `header`, anonymousSlot: false },
    { text: `<slot name="footer" />`, expectedSlotName: `footer`, anonymousSlot: false },
    { text: `<slot />`, expectedSlotName: undefined, anonymousSlot: true },
    { text: `<slot>`, expectedSlotName: undefined, anonymousSlot: true },
    { text: `<slot name = "header">`, expectedSlotName: `header`, anonymousSlot: false },
    { text: `<slot name = "footer" />`, expectedSlotName: `footer`, anonymousSlot: false },
];

describe("Get Slots", () => {
    test.each(listTest)(`Check if slot is anonymous: $text => $anonymousSlot`, ({text, anonymousSlot}) => {
        const slot: boolean = isSlotAnonymous(text);
        expect(slot).toBe(anonymousSlot);
    });

    test.each(listTest)(`Check slot name: $text => $expectedSlotName`, ({text, expectedSlotName}) => {
        const slot: string | undefined= getSlotName(text);
        expect(slot).toBe(expectedSlotName);
    });
});
