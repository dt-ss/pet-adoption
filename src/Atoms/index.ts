import {atom} from 'jotai';
import {UserModel} from "../Model/UserModel";


export const userAtom = atom<UserModel | null>(null);
export const darkModeAtom = atom<boolean>(false);