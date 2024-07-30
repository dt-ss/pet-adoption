// UserProfilePage.tsx
import React, {useEffect, useState} from 'react';
import {Container, Typography, Box, TextField, Button, Avatar, Grid, Switch} from '@mui/material';
import {useAtom} from "jotai";
import {darkModeAtom, userAtom} from "../../Atoms";
import {UserModel} from "../../Model/UserModel";
import {request, validateEmail} from "../../utils";
import {useNavigate} from "react-router-dom";
import {PetModel} from "../../Model/PetModel";
import {SavedPet} from "../../Model/SavedPet";
import {MIN_NAME_LEN, MAX_NAME_LEN} from "../../utils";

/**
 * user profile page - registration or profile edit
 * @constructor
 */
const UserProfilePage: React.FC = () => {
    const [user, setUser] = useState<UserModel | {}>({});
    const [currentUser, setCurrentUser] = useAtom(userAtom)
    const [userError, setUserError] = useState({});
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)
    const [likedPets, setLikedPets] = useState<Record<number, PetModel>>({});
    const navigate = useNavigate()

    // current connected user id - if exists - editing, if not - registering
    const id = currentUser?.id

    // load current logged in user
    useEffect(() => {
        currentUser && setUser({...currentUser})
    }, [currentUser]);

    // when user changes - update error object
    const validateFields = (data: any) => {
        setUserError(last => ({...last, email: !data.email || !validateEmail(data.email)}));
        setUserError(last => ({...last, password: !data.password || data.password.length <= 7}));
        setUserError(last => ({...last, firstName: !data.firstName || data.firstName.length <= MIN_NAME_LEN || data.firstName.length > MAX_NAME_LEN}));
        setUserError(last => ({...last, lastName: !data.lastName || data.lastName.length <= MIN_NAME_LEN || data.lastName.length > MAX_NAME_LEN}));
        setUserError(last => ({...last, phone: !data.phone || isNaN(Number(data.phone)) || data.phone.length !== 10}));
        setUserError(last => ({...last, address: !data.address}));
    };

    // constrain user to its value object
    useEffect(() => validateFields(user), [user])

    // form valid boolean
    const isFormValid = Object.keys(userError).map((k): string => userError[k as keyof typeof userError]).filter(v => v).length === 0;


    useEffect(() => {
        if (id) {
            // pull liked pets for this user
            request(`savedPets/user/${id}`).then(r => r.json().then(d =>
                d.forEach((e: SavedPet) => request(`pets/${e.petId}`).then(r =>
                    r.json().then((d: PetModel) => setLikedPets(last => ({...last, [d.id]: d})))))
            ))
        }
    }, [id])

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(last => ({...last, email: e.target.value}));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(last => ({...last, password: e.target.value}));
    };

    const handleDarkModeToggle = () => {
        setDarkMode((prevDarkMode) => !prevDarkMode);
    };

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(last => ({...last, firstName: e.target.value}));
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(last => ({...last, lastName: e.target.value}));
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(last => ({...last, phone: e.target.value}));
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(last => ({...last, address: e.target.value}));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // post user data or register
        request(id ? `users/${id}` : `users`, {
            method: id ? "PUT" : "POST",
            body: JSON.stringify(user)
        }).then((r) =>
            r.json().then(d => {

                // save user data and go to main
                setCurrentUser(d)
                navigate('/')
            })
        ).catch(e => alert(e))
    };


    return (
        <Container>
            <Box sx={{my: 4}}>
                {/* general title */}
                <Typography variant="h4" gutterBottom>
                    {id ? `${"name" in user ? user.name : ""} Profile Settings` : "Register"}
                </Typography>
            </Box>
            <Box sx={{mb: 4}}>
                <Typography variant="h6" gutterBottom>
                    Account Settings
                </Typography>
                <form onSubmit={handleSubmit}>
                    {/* email field */}
                    <TextField
                        label="Email"
                        fullWidth
                        variant="outlined"
                        value={"email" in user ? user.email : ""}
                        error={!("email" in userError) || !!(userError.email)}
                        onChange={handleEmailChange}
                        sx={{marginBottom: 2}}
                    />
                    {/* password field */}
                    <TextField
                        label="Password"
                        fullWidth
                        variant="outlined"
                        type="password"
                        value={"password" in user ? user.password : ""}
                        error={!("password" in userError) || !!(userError.password)}
                        onChange={handlePasswordChange}
                        sx={{marginBottom: 2}}
                    />
                    <Box sx={{display: 'flex', alignItems: 'center', marginBottom: 2}}>
                        {/* dark mode toggle */}
                        <Typography variant="body1" sx={{marginRight: 2}}>
                            Dark Mode
                        </Typography>
                        <Switch
                            checked={darkMode}
                            onChange={handleDarkModeToggle}
                            color="primary"
                        />
                    </Box>
                </form>
            </Box>
            <Box sx={{marginBottom: 4}}>
                <Typography variant="h6" gutterBottom>
                    Personal Information
                </Typography>
                <form onSubmit={handleSubmit}>
                    {/* first name field */}
                    <TextField
                        label="First Name"
                        fullWidth
                        variant="outlined"
                        value={"firstName" in user ? user.firstName : ""}
                        onChange={handleFirstNameChange}
                        error={!("firstName" in userError) || !!(userError.firstName)}
                        sx={{marginBottom: 2}}
                    />
                    {/* last name field */}
                    <TextField
                        label="Last Name"
                        fullWidth
                        variant="outlined"
                        value={"lastName" in user ? user.lastName : ""}
                        onChange={handleLastNameChange}
                        error={!("lastName" in userError) || !!(userError.lastName)}
                        sx={{marginBottom: 2}}
                    />
                    {/* phone input field */}
                    <TextField
                        label="Phone"
                        fullWidth
                        variant="outlined"
                        value={"phone" in user ? user.phone : ""}
                        onChange={handlePhoneChange}
                        error={!("phone" in userError) || !!(userError.phone)}
                        sx={{marginBottom: 2}}
                    />
                    {/* submit / register button */}
                    <TextField
                        label="Address"
                        fullWidth
                        variant="outlined"
                        value={"address" in user ? user.address : ""}
                        onChange={handleAddressChange}
                        error={!("address" in userError) || !!(userError.address)}
                        sx={{marginBottom: 2}}
                    />
                    <Button type="submit" variant="contained" color="primary" disabled={!isFormValid}>
                        {id ? "Submit" : "Register"}
                    </Button>
                </form>
            </Box>
            <Box>
                {/* liked pets title */}
                <Typography variant="h6" gutterBottom>
                    Liked Pets
                </Typography>

                {/* show liked pets */}
                <Grid container spacing={2}>
                    {Object.keys(likedPets).map((k: any) => (
                        <Grid item key={likedPets[k].id}>
                            {/* liked pets avatar - with link to pet */}
                            <Avatar alt={likedPets[k].name} src={likedPets[k].image}
                                    onClick={() => navigate(`/pet/${likedPets[k].id}`)}
                                    sx={{width: 80, height: 80, marginBottom: 1, cursor: "pointer"}}/>
                            <Typography variant="body2" align="center">{likedPets[k].name}</Typography>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );

};

export default UserProfilePage;
