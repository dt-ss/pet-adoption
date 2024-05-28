// PetProfilePage.tsx
import React from 'react';
import {useParams} from 'react-router-dom';
import {Typography} from '@mui/material';
import {PetModelMock} from "../../Model/PetModel";
import PetCard from "../Core/PetCard";


const PetProfilePage: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const pet = id ? PetModelMock.find((pet) => pet.id === parseInt(id, 10)) : null;

    if (!pet) {
        return <Typography variant="h6">Pet not found</Typography>;
    }

    return (
        <PetCard pet={pet} profileLink={false}/>
    );
};

export default PetProfilePage;
