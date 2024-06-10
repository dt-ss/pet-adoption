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
import {PetModel, PetType} from "../../Model/PetModel";
import animalPrints from "Pictures/animal-prints.png";
import {FavoriteBorder} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {calculateAge} from "../../utils";
import {Box} from "@mui/material";

const PetCard = ({pet, profileLink = true}: { pet: PetModel, profileLink?: boolean }) => {
    const [like, setLike] = useState(false);

    const handleLike = () => {
        setLike(last => !last);
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
                    <Typography gutterBottom variant="h4" component="div">
                        {pet.name}
                    </Typography>
                    <Typography color="text.secondary">
                        <b>Type:</b> {PetType[pet.type_id]}
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
                            Name: {pet.owner.first_name} {pet.owner.last_name}
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
                    <Button color="primary" onClick={handleLike}
                            startIcon={like ? <FavoriteIcon/> : <FavoriteBorder/>}>
                        Save
                    </Button>
                    {profileLink &&
                        <Button component={Link} to={`/pet/${pet.id}`}
                                variant={'contained'} color={'primary'}>
                            View Profile
                        </Button>}
                </CardActions>
            </Card>
        </Paper>
    );
};


export default PetCard;