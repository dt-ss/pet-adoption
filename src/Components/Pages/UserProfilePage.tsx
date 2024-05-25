// UserProfilePage.tsx
import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Avatar, Grid, Switch } from '@mui/material';

const UserProfilePage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleDarkModeToggle = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement logic to update user details
    console.log('Updated email:', email);
    console.log('Updated password:', password);
    console.log('Dark mode:', darkMode);
    console.log('Updated name:', name);
    console.log('Updated phone:', phone);
    console.log('Updated address:', address);
  };

  // Mock data for liked pets
  const likedPets = [
    { id: 1, name: 'Buddy', image: 'https://placedog.net/100/100?random' },
    { id: 2, name: 'Luna', image: 'https://placedog.net/101/101?random' },
    { id: 3, name: 'Max', image: 'https://placedog.net/102/102?random' },
    { id: 4, name: 'Daisy', image: 'https://placedog.net/103/103?random' },
  ];

  return (
    <Container>
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h4" gutterBottom>
          User Profile Settings
        </Typography>
      </Box>
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom>
          Account Settings
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            fullWidth
            variant="outlined"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              Dark Mode
            </Typography>
            <Switch
              checked={darkMode}
              onChange={handleDarkModeToggle}
              color="primary"
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" sx={{ marginRight: 2 }}>
            Save Changes
          </Button>
        </form>
      </Box>
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom>
          Personal Information
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            variant="outlined"
            value={name}
            onChange={handleNameChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Phone"
            fullWidth
            variant="outlined"
            value={phone}
            onChange={handlePhoneChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Address"
            fullWidth
            variant="outlined"
            value={address}
            onChange={handleAddressChange}
            sx={{ marginBottom: 2 }}
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
              <Avatar alt={pet.name} src={pet.image} sx={{ width: 80, height: 80, marginBottom: 1 }} />
              <Typography variant="body2" align="center">{pet.name}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default UserProfilePage;
