const regex = {
    propsGeneric: /export let [\s\S]*?;/gi,
    actionsGeneric: /(?<=dispatch[.(])(.*?)(?=,|\))/gi,
    slotsGeneric: /<slot[\s\S]*?>/gi
};

function hasProps(component:string):boolean {
    const content = component.match(regex.propsGeneric);
    return content != null;
}

function getProps_asInFile (component:string): Array<string> {
    const content = component.match(regex.propsGeneric);
    return content != null ? content : [];
}

function hasActions(component:string):boolean {
    const content = component.match(regex.actionsGeneric);
    return content != null;
}

function getActions_asInFile(component:string): Array<string> {
    const content = component.match(regex.actionsGeneric);
    return content != null ? content : [];
}

function hasSlots(component:string):boolean {
    const content = component.match(regex.slotsGeneric);
    return content != null;
}

function getSlots_asInFile(component:string): Array<string> {
    const content = component.match(regex.slotsGeneric);
    return content != null ? content : [];
}

export { hasProps, getProps_asInFile, hasActions, getActions_asInFile, hasSlots, getSlots_asInFile};