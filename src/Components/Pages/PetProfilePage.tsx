// PetProfilePage.tsx
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import PetCard from "../Core/PetCard";
import {request} from "../../utils";
import {PetModel} from "../../Model/PetModel";


const PetProfilePage: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const [pet, setPet] = useState<PetModel>();
    useEffect(() => {
        id && request(`pets/${id}`).then(r => r.json().then(p => setPet(p)))
    }, [id])


    return (
        pet && <PetCard pet={pet} profileLink={false}/>
    );
};

export default PetProfilePage;
