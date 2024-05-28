import React from "react";
import {Grid} from "@mui/material";
import {PetModelMock} from "../../Model/PetModel";
import PetCard from "../Core/PetCard";
import {useSearchParams} from "react-router-dom";
import {calculateAge} from "../../utils";

export const MainPage = () => {

    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const minAge = searchParams.get('minAge');
    const maxAge = searchParams.get('maxAge');
    const petType = searchParams.get('petType');

    return (
        <Grid
            container
            spacing={3}
            sx={{p: 4}}
            direction="row"
            justifyContent={'space-between'}
        >
            {PetModelMock.filter(p =>
                p.name.toLowerCase().includes(query?.toLowerCase() || '')
                && (!maxAge || calculateAge(p.birthDate) <= parseInt(maxAge))
                && (!minAge || calculateAge(p.birthDate) >= parseInt(minAge))
                && (!petType || petType === p.type)
            ).map(elem => (
                <Grid item sm={12} md={6} lg={4} xl={3} key={elem.id}>
                    <PetCard pet={elem}/>
                </Grid>
            ))}
        </Grid>
    )
}