import {UserModel} from "../Model/UserModel";
import {atomWithStorage} from "jotai/utils";
import {atom} from "jotai";

const initialStorageValue = (key: string, initialValue: any = null) => localStorage.getItem(key) !== null
    ? JSON.parse(localStorage.getItem(key)!)
    : initialValue;

export const userAtom = atomWithStorage<UserModel | null>('user', initialStorageValue('user'));
export const darkModeAtom = atomWithStorage<boolean>('darkMode', initialStorageValue('darkMode', false));
export const skipLoginAtom = atom<boolean>(false)