import React from "react";
import {PetPaper} from "../Core/PetPaper";
import {Button, Box, Paper, Grid} from "@mui/material";

const data = [1, 2, 3, 4]
export const Main = () => {
    return (
        <Grid
            container
            spacing={4}
            sx={{p:4}}
            direction="row"
            justifyContent={'space-between'}
        >
            {data.map(elem => (
                <Grid item sm={12} md={4} key={data.indexOf(elem)}>
                    <PetPaper/>
                </Grid>
            ))}
        </Grid>
    )
}