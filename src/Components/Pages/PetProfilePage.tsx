// PetProfilePage.tsx
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import PetCard from "../Core/PetCard";
import {request} from "../../utils";
import {PetModel} from "../../Model/PetModel";
import {useAtom} from "jotai/index";
import {userAtom} from "../../Atoms";
import {SavedPet} from "../../Model/SavedPet";
import PetRegistrationPage from "./PetRegistrationPage";


/**
 * pet profile page - show registration / card component
 * @constructor
 */
const PetProfilePage: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const [pet, setPet] = useState<PetModel>();
    const [user] = useAtom(userAtom)
    const [savedPets, setSavedPets] = useState<SavedPet[]>();
    useEffect(() => {
        id && request(`pets/${id}`).then(r => r.json().then(p => {
            setPet(p)
            request(`savedPets/user/${user?.id}`).then(r => r.json().then(v =>
                setSavedPets(v)
            ))
        }))
    }, [id, user])


    return (

        pet && savedPets ?
            pet.owner.id === user?.id ?
                <PetRegistrationPage currentPet={pet}/> :
                <PetCard isSaved={!!savedPets.filter(e => e.petId === pet.id).length} pet={pet}
                         profileLink={false}/> : <></>
    );
};

export default PetProfilePage;
