// UserProfilePage.tsx
import React, {useEffect, useState} from 'react';
import {Container, Typography, Box, TextField, Button, Avatar, Grid, Switch} from '@mui/material';
import {useAtom} from "jotai";
import {darkModeAtom} from "../../Atoms";
import {UserModel} from "../../Model/UserModel";
import {request, validateEmail} from "../../utils";
import {useNavigate, useParams} from "react-router-dom";

const UserProfilePage: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const [user, setUser] = useState<UserModel | {}>({});
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)
    const navigate = useNavigate()
    useEffect(() => {
        if (id) {
            request(`users/${id}`).then(r => r.json().then(d => setUser(d)))
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
        request(`users`, {
            method: "POST",
            body: JSON.stringify(user)
        }).then(()=>navigate('/')).catch(e => console.error(e))
    };

    // Mock data for liked pets
    const likedPets = [
        {id: 1, name: 'Buddy', image: 'https://placedog.net/100/100?random'},
        {id: 2, name: 'Luna', image: 'https://placedog.net/101/101?random'},
        {id: 3, name: 'Max', image: 'https://placedog.net/102/102?random'},
        {id: 4, name: 'Daisy', image: 'https://placedog.net/103/103?random'},
    ];

    // @ts-ignore
    return (
        <Container>
            <Box sx={{my: 4}}>
                <Typography variant="h4" gutterBottom>
                    {id? `${"name" in user ? user.name : ""} Profile Settings` : "Register"}
                </Typography>
            </Box>
            <Box sx={{mb: 4}}>
                <Typography variant="h6" gutterBottom>
                    Account Settings
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        fullWidth
                        variant="outlined"
                        value={"email" in user ? user.email : ""}
                        error={!("email" in user && user.email && validateEmail(user.email))}
                        onChange={handleEmailChange}
                        sx={{marginBottom: 2}}
                    />
                    <TextField
                        label="Password"
                        fullWidth
                        variant="outlined"
                        type="password"
                        value={"password" in user ? user.password : ""}
                        error={!("password" in user && user.password && user.password.length > 7)}
                        onChange={handlePasswordChange}
                        sx={{marginBottom: 2}}
                    />
                    <Box sx={{display: 'flex', alignItems: 'center', marginBottom: 2}}>
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
                    <TextField
                        label="First Name"
                        fullWidth
                        variant="outlined"
                        value={"firstName" in user ? user.firstName : ""}
                        onChange={handleFirstNameChange}
                        error={!("firstName" in user && user.firstName && user.firstName.length > 2)}
                        sx={{marginBottom: 2}}
                    />
                    <TextField
                        label="Last Name"
                        fullWidth
                        variant="outlined"
                        value={"lastName" in user ? user.lastName : ""}
                        onChange={handleLastNameChange}
                        error={!("lastName" in user && user.lastName && user.lastName.length > 2)}
                        sx={{marginBottom: 2}}
                    />
                    <TextField
                        label="Phone"
                        fullWidth
                        variant="outlined"
                        value={"phone" in user ? user.phone : ""}
                        onChange={handlePhoneChange}
                        error={!("phone" in user && user.phone && !isNaN(Number(user.phone)) && user.phone.length === 10)}
                        sx={{marginBottom: 2}}
                    />
                    <TextField
                        label="Address"
                        fullWidth
                        variant="outlined"
                        value={"address" in user ? user.address : ""}
                        onChange={handleAddressChange}
                        error={!("address" in user)}
                        sx={{marginBottom: 2}}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Save Changes
                    </Button>
                </form>
            </Box>
            <Box>
                <Typography variant="h6" gutterBottom>
                    Liked Pets
                </Typography>
                <Grid container spacing={2}>
                    {likedPets.map((pet) => (
                        <Grid item key={pet.id}>
                            <Avatar alt={pet.name} src={pet.image} sx={{width: 80, height: 80, marginBottom: 1}}/>
                            <Typography variant="body2" align="center">{pet.name}</Typography>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default UserProfilePage;
