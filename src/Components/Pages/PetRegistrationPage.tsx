// pages/PetRegistrationPage.tsx
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Avatar, Box, Button, Container, MenuItem, TextField, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useDropzone} from 'react-dropzone';
import {PetModel, PetType} from "../../Model/PetModel";
import {useAtom} from "jotai";
import {userAtom} from "../../Atoms";
import {enumToObject, request} from "../../utils";

// pet type object to be used at dropdown
const petTypeObject = enumToObject(PetType);

/**
 * pet registration / edit component
 * @param currentPet if provided - editing this pet
 * @constructor
 */
const PetRegistrationPage = ({currentPet = {typeId: PetType.Other}}: { currentPet?: PetModel | {} }) => {
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState<PetModel | {}>({});
    const [pet, setPet] = useState<PetModel | {}>(currentPet);
    const [user] = useAtom(userAtom)
    const [imageError, setImageError] = useState<string | null>(null);
    const navigate = useNavigate();

    // pull data from current pet if provided
    useEffect(() => {

        // pull image
        if ("image" in currentPet && currentPet.image) {
            fetch(currentPet.image).then(r => r.blob().then(d => setImage(new File([d], 'name'))))
        }
        // pull type
        if ("type" in currentPet && currentPet.type) {
            setPet(p => ({...p, typeId: currentPet.type?.id}))
        }
    }, [currentPet]);


    // form valid if all pet options are valid
    const isFormValid = Object.keys(error).map((k): string => error[k as keyof typeof error]).filter(v => v).length === 0;


    /**
     * on image drop callback
     */
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPet(last => ({...last, image: reader.result as string}));
        };
        reader.readAsDataURL(file);
    }, []);

    /**
     * image dropzone effects
     */
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            'image/*': []
        },
        maxFiles: 1,
        onDropRejected: () => setImageError('File type not accepted or too many files')
    });

    /**
     * submit callback function
     */
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!image) {
            setImageError('Please upload an image');
            return;
        }

        // put / post pet data if editing or registering
        request("id" in pet ? `pets/${pet.id}` : 'pets',
            {
                method: "id" in pet ? "PUT" : "POST",
                body: JSON.stringify({...pet, ownerId: user?.id})
            }).then(() => navigate('/'))

    };

    /**
     * callback to constrict pet change to error object
     */
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
            {/* title*/}
            <Typography variant="h4" sx={{mt: 4}}>
                {"id" in pet ? "Edit " + pet.name : "Register New Pet"}
            </Typography>
            {/*form*/}
            <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                {/* name input field */}
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
                {/* image upload box */}
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
                {/* description input field */}
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
                {/* birth date input field */}
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
                {/* types dropdown */}
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
                {/* submit button */}
                <Button
                    type="submit"
                    fullWidth
                    disabled={!isFormValid}
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    {"id" in pet ? "Submit" : "Register"}
                </Button>
            </Box>
        </Container>
    );
};

export default PetRegistrationPage;
