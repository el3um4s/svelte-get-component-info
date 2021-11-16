import type { Action } from "./interfaces";

function getActions(s:string):Action {
    const name:string = getActionName(s);
    return {name};
}

function getActionName(s:string):string {
    const action:string = s.trim().substring(1).trim();
    const name:string = action.substring(1,action.length-1);
    return name;
}

export { getActions, getActionName };