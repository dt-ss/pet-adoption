import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import {PetModel} from "../../Model/PetModel";
import PetCard from "../Core/PetCard";
import {useSearchParams} from "react-router-dom";
import {request} from "../../utils";
import {SavedPet} from "../../Model/SavedPet";
import {useAtom} from "jotai/index";
import {userAtom} from "../../Atoms";
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';
import {Box} from "@mui/material";
import {Pets} from "@mui/icons-material";

/**
 * main page component
 * @constructor
 */
export const MainPage = () => {

    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const minAge = searchParams.get('minAge');
    const maxAge = searchParams.get('maxAge');
    const petType = searchParams.get('petType');
    const [loading, setLoading] = useState(true);
    const [pets, setPets] = useState<PetModel[]>([]);
    const [savedPets, setSavedPets] = useState<SavedPet[]>([]);
    const [user] = useAtom(userAtom)

    // pull pets and saved pets lists from server
    useEffect(() => {
        const p =
            `pets/filter?${query ? `&name=${query}` : ``}${minAge ? `&minAge=${minAge}` : ``}${maxAge ? `&maxAge=${maxAge}` : ``}${petType ? `&typeId=${petType}` : ``}`
        request(p).then(r => r.json().then(d => {
            setPets(d);
            user ? request(`savedPets/user/${user?.id}`).then(r => r.json().then(d => {
                setSavedPets(d)
                setLoading(false)
            })) : setLoading(false)
        }))
    }, [user, query, minAge, maxAge, petType])

    return (loading ? <></> :
            <Grid
                container
                spacing={3}
                sx={{p: 4}}
                direction="row"
                justifyContent={'space-between'}
            >
                {/* show filtered pet cards */}
                {pets.length? pets.map(elem => (
                    <Grid item sm={12} md={6} lg={4} xl={3} key={elem.id}>
                        <PetCard isLiked={!!savedPets.filter(e => e.petId === elem.id).length} pet={elem}/>
                    </Grid>
                )) :
                    <Grid item sx={{textAlign: "center"}} sm={12}>
                        <Pets sx={{fontSize: "20rem"}}/>
                        <h1>No pets found</h1>
                        <h4>You may add new pets or broaden search parameters</h4>
                    </Grid>}
            </Grid>
    )
}