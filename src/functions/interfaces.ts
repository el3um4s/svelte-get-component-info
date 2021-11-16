export interface Content {
    error: Reading;
    content: Reading;
}

export interface Reading {
    status: boolean;
    content: string;
}

export interface Prop {
    name: string;
    type?: string;
    defaultValue?: string;
}

export interface Action {
    name: string;
}

export interface SvelteInformations {
    props: Array<Prop>;
    actions: Array<Action>;
}