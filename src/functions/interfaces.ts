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
}