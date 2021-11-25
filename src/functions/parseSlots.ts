import type { Slot } from "./interfaces";

const regex = {
    slotName: /(?<=name\s*=)(.*)("|'|`)/gi
};

function getSlotInfo(s:string):Slot {
    const anonymous:boolean = isSlotAnonymous(s);
    const name:string|undefined = getSlotName(s);
    return { name, anonymous };
}

function getSlotName(s:string):string|undefined {
    const slot = s.match(regex.slotName)?.[0].trim();
    const name: string|undefined = slot == null ? undefined : slot.substring(1, slot.length - 1);
    return name;
}

function isSlotAnonymous(s:string): boolean {
    const slot = s.match(regex.slotName);
    return slot == null;
}

export { getSlotName, isSlotAnonymous, getSlotInfo };