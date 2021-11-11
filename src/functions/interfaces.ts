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
    type: string|undefined;
    defaultValue: string|undefined;
}

export interface SvelteInformations {
    props: Array<Prop>;
}