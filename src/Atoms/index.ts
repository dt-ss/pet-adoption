import {UserModel} from "../Model/UserModel";
import {atomWithStorage} from "jotai/utils";
import {atom} from "jotai";

export const userAtom = atomWithStorage<UserModel | null>('user',null);
export const darkModeAtom = atomWithStorage<boolean>('darkMode', false);
export const skipLoginAtom = atom<boolean>(false)