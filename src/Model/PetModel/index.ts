import {UserModel} from "../UserModel";
export const petTypes = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Fish', 'Reptile', 'Other'] as const;
export type PetType = typeof petTypes[number];
export interface PetModel {
    id: number
    owner: UserModel,
    name: string
    image?: string
    description: string
    birthDate: string
    type: PetType
}
