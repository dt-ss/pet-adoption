import {atom} from 'jotai';


export const pages = ['main'] as const;
export type Page = typeof pages[number];

export interface User {
    name?: string
    family?: string
    email: any
    password: any
}

export const userAtom = atom<User | null>(null);
export const darkModeAtom = atom<boolean>(false);
export const pageAtom = atom<Page | null>(null);
