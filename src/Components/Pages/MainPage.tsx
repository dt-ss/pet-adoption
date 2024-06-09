import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import {PetModel} from "../../Model/PetModel";
import PetCard from "../Core/PetCard";
import {useSearchParams} from "react-router-dom";
import {calculateAge, request} from "../../utils";

export const MainPage = () => {

    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const minAge = searchParams.get('minAge');
    const maxAge = searchParams.get('maxAge');
    const petType = searchParams.get('petType');
    const [loading, setLoading] = useState(true);
    const [pets, setPets] = useState<PetModel[]>([]);

    useEffect(() => {
        request('pets').then(r=>r.json().then(d=>{
            setPets(d);
            setLoading(false)
        }))
    }, [])

    return (loading ? <></> :
            <Grid
                container
                spacing={3}
                sx={{p: 4}}
                direction="row"
                justifyContent={'space-between'}
            >
                {pets.filter(p =>
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