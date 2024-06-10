// pages/PetRegistrationPage.tsx
import React, {useState, useCallback} from 'react';
import {TextField, Button, Container, Typography, Box, MenuItem, Avatar, Alert} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useDropzone} from 'react-dropzone';
import {PetType} from "../../Model/PetModel";
import {useAtom} from "jotai";
import {userAtom} from "../../Atoms";
import {request} from "../../utils";

const PetRegistrationPage = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
    const [description, setDescription] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [typeId, setTypeId] = useState<PetType>(PetType.Other);
    const [user] = useAtom(userAtom)
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

        console.log({
            ownerId: user?.id,
            name,
            image: imagePreview as string,
            description,
            birthDate,
            type_id: typeId,
        })


        request('pets',{method:"POST", body:JSON.stringify({
            ownerId: user?.id,
            name,
            image: imagePreview as string,
            description,
            birthDate,
            type_id: typeId,
        })}).then(()=>navigate('/'))

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
                    value={typeId}
                    onChange={(e) => setTypeId(parseInt(e.target.value))}
                >
                    {Object.keys(PetType).map((option, index) => (
                        <MenuItem key={index} value={index}>
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
