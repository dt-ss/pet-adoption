import React, {useState} from 'react';
import {
    Paper,
    Typography,
    Button,
    Card,
    CardContent,
    CardMedia,
    CardActions,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {PetModel} from "../../Model/PetModel";
import animalPrints from "Pictures/animal-prints.png";
import {FavoriteBorder} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {calculateAge, request} from "../../utils";
import {Box} from "@mui/material";
import {useAtom} from "jotai";
import {userAtom} from "../../Atoms";

/**
 * pet card component - used at main page on small cards and at pet view card
 * @param pet pet data
 * @param isSaved is pet saved for this user
 * @constructor
 */
const PetCard = ({pet, isSaved}: {
    pet: PetModel,
    isSaved: boolean,
    profileLink?: boolean
}) => {
    const [user] = useAtom(userAtom)
    const [like, setLike] = useState(isSaved);

    /**
     * handle like button click
     */
    const handleLike = () => {
        if (like) {
            request(`savedPets/user/${user?.id}/pet/${pet.id}`, {method: "DELETE"}).then(r => setLike(false))
        } else {
            request('savedPets', {
                method: "POST",
                body: JSON.stringify({userId: user?.id, petId: pet.id})
            }).then(r => setLike(true))
        }
    };

    return (
        <Paper elevation={3} sx={{p: 2}}>
            <Card elevation={0}>
                <CardMedia
                    component="img"
                    height="400"
                    image={pet.image ? pet.image : animalPrints}
                    alt={`${pet.name}'s photo`}
                />
                <CardContent>

                    {/* pet details */}
                    <Typography gutterBottom variant="h4" component="div">
                        {pet.name}
                    </Typography>
                    <Typography color="text.secondary">
                        <b>Type:</b> {pet.type?.type}
                    </Typography>
                    <Typography color="text.secondary">
                        <b>Age:</b> {calculateAge(pet.birthDate)} years
                    </Typography>
                    <Typography color="text.secondary">
                        {pet.description}
                    </Typography>

                    {/* Owner Details */}
                    <Box mt={2}>
                        <Typography variant="h6" component="div">
                            Owner Details
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Name: {pet.owner.firstName} {pet.owner.lastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Phone: {pet.owner.phone}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Address: {pet.owner.address}
                        </Typography>
                    </Box>

                </CardContent>
                <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>

                    {/* save button (like) */}
                    <Button color="primary" onClick={handleLike}
                            startIcon={like ? <FavoriteIcon/> : <FavoriteBorder/>}>
                        Save
                    </Button>

                    {/* view profile button */}
                    <Button component={Link} to={`/pet/${pet.id}`}
                            variant={'contained'} color={'primary'}>
                        View Profile
                    </Button>
                </CardActions>
            </Card>
        </Paper>
    );
};


export default PetCard;