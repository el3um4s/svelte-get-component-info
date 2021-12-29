import { readFileSvelte } from "./readFileSvelte";
import { getProps_asInFile, getActions_asInFile, getSlots_asInFile, getCSS_asInFile } from "./parseFileSvelte";
import { getPropInfo } from "./parseProps";
import { getActionInfo } from "./parseActions";
import { getSlotInfo } from "./parseSlots";
import { getCSSInfo } from "./parseCSS";

import { Content, Prop, Action, Slot, CSS, SvelteInformations } from "./interfaces";

function getInfo(source: string):SvelteInformations {
    const file:Content = readFileSvelte(source);
    
    const propsAsInFile = getProps_asInFile(file.content.content);
    const props:Array<Prop> = [];
    propsAsInFile.forEach(p => props.push(getPropInfo(p)));

    const actionsAsInFile = getActions_asInFile(file.content.content);
    const actionsWithDuplicates:Array<Action> = [];
    actionsAsInFile.forEach(a => actionsWithDuplicates.push(getActionInfo(a)));
    const act = new Set();
    const actions:Array<Action> = actionsWithDuplicates.filter( el => {
        const duplicate = act.has(el.name);
        act.add(el.name);
        return !duplicate;
    });

    const slotsInFile = getSlots_asInFile(file.content.content);
    const slotsWithDuplicates:Array<Slot> = [];
    slotsInFile.forEach(s => slotsWithDuplicates.push(getSlotInfo(s)));
    const slot = new Set();
    const slots:Array<Slot> = slotsWithDuplicates.filter( el => {
        const duplicate = slot.has(el.name);
        slot.add(el.name);
        return !duplicate;
    });

    const cssInFile = getCSS_asInFile(file.content.content);
    const cssWithDuplicates:Array<CSS> = [];
    cssInFile.forEach(s => cssWithDuplicates.push(getCSSInfo(s)));
    const c = new Set();
    const css:Array<CSS> = cssWithDuplicates.filter( el => {
        const duplicate = c.has(el.name);
        c.add(el.name);
        return !duplicate;
    });


    return { props, actions, slots, css };
}

export { getInfo };
