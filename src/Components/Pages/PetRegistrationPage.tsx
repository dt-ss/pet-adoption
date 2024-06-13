// pages/PetRegistrationPage.tsx
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Avatar, Box, Button, Container, MenuItem, TextField, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useDropzone} from 'react-dropzone';
import {PetModel, PetType} from "../../Model/PetModel";
import {useAtom} from "jotai";
import {userAtom} from "../../Atoms";
import {enumToObject, request} from "../../utils";

const petTypeObject = enumToObject(PetType);
const PetRegistrationPage = () => {
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState<PetModel | {}>({});
    const [pet, setPet] = useState<PetModel | {}>({typeId: PetType.Other});
    const [user] = useAtom(userAtom)
    const [imageError, setImageError] = useState<string | null>(null);
    const navigate = useNavigate();

    const isFormValid = Object.keys(error).map((k): string => error[k as keyof typeof error]).filter(v => v).length === 0;

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPet(last => ({...last, image: reader.result as string}));
        };
        reader.readAsDataURL(file);
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            'image/*': []
        },
        maxFiles: 1,
        onDropRejected: () => setImageError('File type not accepted or too many files')
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!image) {
            setImageError('Please upload an image');
            return;
        }


        request('pets', {method: "POST", body: JSON.stringify({...pet, ownerId: user?.id})}).then(() => navigate('/'))

    };

    useEffect(() => {
        setError(last => ({
            ...last,
            description: !("description" in pet && pet.description && pet.description.length > 2)
        }))
        setError(last => ({...last, name: !("name" in pet && pet.name && pet.name.length > 2)}))
        setError(last => ({...last, birthDate: !("birthDate" in pet && pet.birthDate && pet.birthDate.length)}))
        setError(last => ({...last, image: !("image" in pet && pet.image && pet.image.length)}))
        setError(last => ({...last, typeId: !("typeId" in pet && pet.typeId)}))
    }, [pet])

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
                    value={"name" in pet ? pet.name : ""}
                    error={!("name" in error) || !!(error.name)}
                    onChange={(e) => setPet(last => ({...last, name: e.target.value}))}
                />
                <Box
                    {...getRootProps()}
                    color={!("image" in error) || !!(error.image) ? 'error.main' : 'primary.main'}
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
                {"image" in pet && pet.image && (
                    <Avatar
                        src={pet.image}
                        alt="Pet Image"
                        sx={{width: 100, height: 100, mb: 2}}
                    />
                )}
                {imageError && (
                    <Alert severity="error" onClose={() => setImageError(null)} sx={{mb: 2}}>
                        {imageError}
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
                    value={"description" in pet ? pet.description : ""}
                    error={!("description" in error) || !!(error.description)}
                    onChange={(e) => setPet(last => ({...last, description: e.target.value}))}
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
                    value={"birthDate" in pet ? pet.birthDate : ""}
                    error={!("birthDate" in error) || !!(error.birthDate)}
                    onChange={(e) => setPet(last => ({...last, birthDate: e.target.value}))}
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
                    value={"typeId" in pet ? pet.typeId : ""}
                    error={!("typeId" in error) || !!(error.typeId)}
                    onChange={(e) => setPet(last => ({...last, typeId: parseInt(e.target.value)}))}
                >
                    {Object.keys(petTypeObject).map((key) => (
                        <MenuItem key={key} value={petTypeObject[key]}>
                            {key}
                        </MenuItem>
                    ))}
                </TextField>
                <Button
                    type="submit"
                    fullWidth
                    disabled={!isFormValid}
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
