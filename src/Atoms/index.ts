import {atom} from 'jotai';

export interface User {
    id: string | number;
    name?: string
    family?: string
    email: any
    password: any
}

export const userAtom = atom<User | null>(null);
export const darkModeAtom = atom<boolean>(false);