import { readFileSvelte } from "./readFileSvelte";
import { getProps_asInFile, getActions_asInFile } from "./parseFileSvelte";
import { getPropInfo } from "./parseProps";
import { getActions } from "./parseActions";
import { Content, Prop, Action, SvelteInformations } from "./interfaces";

function getInfo(source: string):SvelteInformations {
    const file:Content = readFileSvelte(source);
    
    const propsAsInFile = getProps_asInFile(file.content.content);
    const props:Array<Prop> = [];
    propsAsInFile.forEach(p => props.push(getPropInfo(p)));

    const actionsAsInFile = getActions_asInFile(file.content.content);
    const actionsWithDuplicates:Array<Action> = [];
    actionsAsInFile.forEach(a => actionsWithDuplicates.push(getActions(a)));
    const act = new Set();
    const actions:Array<Action> = actionsWithDuplicates.filter( el => {
        const duplicate = act.has(el.name);
        act.add(el.name);
        return !duplicate;
    });

    return { props, actions };
}

export { getInfo };

