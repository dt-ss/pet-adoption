import {UserModel} from "../UserModel";

export enum PetType {
    Dog = 1,
    Cat,
    Bird,
    Rabbit,
    Fish,
    Reptile,
    Other
}

export interface PetModel {
    id: number
    owner: UserModel,
    name: string
    image?: string
    description: string
    birthDate: string
    typeId: PetType
}
