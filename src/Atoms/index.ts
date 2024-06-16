import {UserModel} from "../Model/UserModel";
import {atomWithStorage} from "jotai/utils";


export const userAtom = atomWithStorage<UserModel | null>('user',null);
export const darkModeAtom = atomWithStorage<boolean>('darkMode', false);