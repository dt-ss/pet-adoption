// PetProfilePage.tsx
import React from 'react';
import {useParams} from 'react-router-dom';
import {Container, Typography, Card, CardContent, CardMedia, Box} from '@mui/material';
import {PetModelMock} from "../../Model/PetModel";
import {calculateAge} from "../../utils";

const PetProfilePage: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const pet = id ? PetModelMock.find((pet) => pet.id === parseInt(id, 10)) : null;

    if (!pet) {
        return <Typography variant="h6">Pet not found</Typography>;
    }

    return (
        <Container sx={{marginTop: 4}}>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Card sx={{maxWidth: 600}}>
                    <CardMedia
                        component="img"
                        height="400"
                        image={pet.image}
                        alt={`${pet.name}'s photo`}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            {pet.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Age: {calculateAge(pet.birthDate)} years
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Type: {pet.type}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{marginTop: 2}}>
                            {pet.description}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default PetProfilePage;
