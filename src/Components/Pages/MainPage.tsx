import React from "react";
import {Grid} from "@mui/material";
import {PetModelMock} from "../../Model/PetModel";
import PetCard from "../Core/PetCard";

export const MainPage = () => {
    return (
        <Grid
            container
            spacing={4}
            sx={{p:4}}
            direction="row"
            justifyContent={'space-between'}
        >
            {PetModelMock.map(elem => (
                <Grid item sm={12} md={6} lg={4} xl={3} key={elem.id}>
                    <PetCard pet={elem} />
                </Grid>
            ))}
        </Grid>
    )
}