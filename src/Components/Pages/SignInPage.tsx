import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import dogs from 'Pictures/image-dog-login.jpg';
import {userAtom} from "Atoms";
import {useAtom} from "jotai";
import {validateEmail} from "utils";
import {Copyright} from "../Core/Copyright";
import {Pets} from "@mui/icons-material";
import {useNavigate, useLocation} from "react-router-dom";

export function SignInPage() {

    const [, setUser] = useAtom(userAtom);
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setUser({
            id: 1,
            email: data.get('email'),
            password: data.get('password')
        })
        navigate(location.state?.from?.pathname || "/")
    };

    return (
        <Grid container component="main" sx={{height: '100vh'}}>


            {/* image - left side */}
            <Grid
                item
                sm={false}
                md={7}
                sx={{
                    backgroundImage: `url(${dogs})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <Box sx={{
                    color: 'white', fontSize: "250%",
                    flexGrow: 1, display: {xs: 'none', md: 'flex'},
                    flexDirection: "row", alignItems: "center"
                }}>
                    {/* pets title */}
                    <Box sx={{display: 'flex', flexDirection: 'column', mx: "auto", marginTop: 10}}>
                        <Box display='flex' flexDirection='row'>

                            <Typography fontFamily={'Anada'} sx={{top: 30, position: "relative"}}
                                        variant={"h1"}>Pets</Typography>
                            <Pets sx={{width: 50, height: 50}}/>
                        </Box>
                        <Typography>By Daniel & Yolanda</Typography>
                    </Box>

                </Box>
            </Grid>

            {/* right side - login form */}
            <Grid item
                  xs={12}
                  sm={12}
                  md={5}
                  component={Paper}
                  elevation={6} square>
                <Box
                    sx={{
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: "100%"
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        marginTop: "auto",
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        {/* lock avatar */}
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>

                        {/* sign in title */}
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                    </Box>

                    {/* form with signin button */}
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>

                        {/* username */}
                        <TextField
                            margin="normal"
                            required
                            onChange={e => setEmailValid(!!validateEmail(e.target.value))}
                            error={!emailValid}
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />

                        {/* password */}
                        <TextField
                            margin="normal"
                            onChange={e => setPasswordValid(!!e.target.value)}
                            error={!passwordValid}
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        {/* checkbox */}
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />

                        {/* sign in button */}
                        <Button
                            type="submit"
                            disabled={!passwordValid || !emailValid}
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>

                        {/* forgot and signup buttons */}
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    {"Forgot password?"}
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>

                    </Box>

                    {/* copyright row */}
                    <Box sx={{marginTop: "auto"}}>
                        <Copyright sx={{py: 1}}/>
                    </Box>

                </Box>


            </Grid>
        </Grid>
    );
}