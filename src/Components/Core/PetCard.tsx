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
import {calculateAge} from "../../utils";

const PetCard = ({pet}: { pet: PetModel }) => {
    const [like, setLike] = useState(false);

    const handleLike = () => {
        setLike(last => !last);
    };

    return (
        <Paper elevation={3} sx={{padding: 2, borderRadius: 5}}>
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
                        Age: {calculateAge(pet.birthDate)} years
                    </Typography>
                    <Typography color="text.secondary" sx={{marginTop: 1}}>
                        {pet.description}
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button color="primary" onClick={handleLike}
                            startIcon={like ? <FavoriteIcon/> : <FavoriteBorder/>}>
                        Save
                    </Button>
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