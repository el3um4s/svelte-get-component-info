// import type { Action } from "./interfaces";

// function getActions(s:string):Action {
//     const name:string = getActionName(s);
//     return {name};
// }

// function getActionName(s:string):string {
//     const action:string = s.trim().substring(1).trim();
//     const name:string = action.substring(0,action.length-1);
//     return name;
// }

// export { getActions, getActionName };

import type { Slot } from "./interfaces";

const regex = {
    slotName: /(?<=name\s*=)(.*)("|'|`)/gi
};

function getSlotName(s:string):string|undefined {
    const slot = s.match(regex.slotName)?.[0].trim();
    const name: string|undefined = slot == null ? undefined : slot.substring(1, slot.length - 1);
    return name;
}

function isSlotAnonymous(s:string): boolean {
    const slot = s.match(regex.slotName);
    return slot == null;
}

export { getSlotName, isSlotAnonymous };