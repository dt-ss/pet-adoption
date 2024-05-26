import React from "react";
import {Grid} from "@mui/material";
import {PetModelMock} from "../../Model/PetModel";
import PetCard from "../Core/PetCard";
import {useSearchParams} from "react-router-dom";

export const MainPage = () => {

    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');

    return (
        <Grid
            container
            spacing={3}
            sx={{p:4}}
            direction="row"
            justifyContent={'space-between'}
        >
            {PetModelMock.filter(p=>p.name.toLowerCase().includes(query?.toLowerCase() || '')).map(elem => (
                <Grid item sm={12} md={6} lg={4} xl={3} key={elem.id}>
                    <PetCard pet={elem} />
                </Grid>
            ))}
        </Grid>
    )
}