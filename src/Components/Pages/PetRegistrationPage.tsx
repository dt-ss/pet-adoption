// pages/PetRegistrationPage.tsx
import React, {useState, useCallback} from 'react';
import {TextField, Button, Container, Typography, Box, MenuItem, Avatar, Alert} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useDropzone} from 'react-dropzone';
import {PetModelMock, petTypes, PetType} from "../../Model/PetModel";
import {generateRandomMockUser} from "../../Model/UserModel";

const PetRegistrationPage = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
    const [description, setDescription] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [type, setType] = useState<PetType>('Other');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            'image/*': []
        },
        maxFiles: 1,
        onDropRejected: () => setError('File type not accepted or too many files')
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!image) {
            setError('Please upload an image');
            return;
        }

        // Here, you would typically send the data to your server
        // For this example, we just log the data and navigate to a success page
        const newPet = {
            id: Date.now(), // This is just for the example; typically, the server would generate the ID
            ownerId: 1, // This would be the ID of the logged-in user
            name,
            owner: generateRandomMockUser(),
            image: imagePreview as string, // You would send this to your server
            description,
            birthDate,
            type,
        };

        PetModelMock.push(newPet)
        // Navigate to a different page after registration, e.g., pet profile or home
        navigate('/');
    };

    return (
        <Container>
            <Typography variant="h4" sx={{mt: 4}}>
                Register New Pet
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Pet Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Box
                    {...getRootProps()}
                    sx={{
                        border: '2px dashed #ccc',
                        borderRadius: '5px',
                        textAlign: 'center',
                        padding: '20px',
                        cursor: 'pointer',
                        marginBottom: '16px'
                    }}
                >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the image here ...</p>
                    ) : (
                        <p>Drag 'n' drop an image here, or click to select an image</p>
                    )}
                </Box>
                {imagePreview && (
                    <Avatar
                        src={imagePreview as string}
                        alt="Pet Image"
                        sx={{width: 100, height: 100, mb: 2}}
                    />
                )}
                {error && (
                    <Alert severity="error" onClose={() => setError(null)} sx={{mb: 2}}>
                        {error}
                    </Alert>
                )}
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    autoComplete="description"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="birthDate"
                    label="Birth Date"
                    name="birthDate"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="type"
                    label="Type"
                    name="type"
                    select
                    value={type}
                    onChange={(e) => setType(e.target.value as PetType)}
                >
                    {petTypes.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Register
                </Button>
            </Box>
        </Container>
    );
};

export default PetRegistrationPage;
