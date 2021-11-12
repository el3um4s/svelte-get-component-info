import { readFileSvelte } from "./readFileSvelte";
import { getProps_asInFile } from "./parseFileSvelte";
import { getPropInfo } from "./parseProps";
import { Content, Prop, SvelteInformations } from "./interfaces";

function getInfo(source: string):SvelteInformations {
    const file:Content = readFileSvelte(source);
    const propsAsInFile = getProps_asInFile(file.content.content);
    const props:Array<Prop> = [];
    propsAsInFile.forEach(p => props.push(getPropInfo(p)));
    return { props };
}

export {getInfo};