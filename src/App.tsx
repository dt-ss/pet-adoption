import 'Styles/App.css';
import React from "react";
import {createTheme, ThemeOptions, ThemeProvider} from '@mui/material/styles';
import {CssBaseline} from "@mui/material";
import {useAtom} from "jotai";
import {darkModeAtom, userAtom} from "./Atoms";
import {SignInPage} from "Components/Pages/SignInPage";
import {MainPage} from "./Components/Pages/MainPage";
import ResponsiveAppBar from "./Components/Core/AppBar";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import PetProfilePage from "./Components/Pages/PetProfilePage";
import UserProfilePage from "./Components/Pages/UserProfilePage";
import {ProtectedRoute} from "./Components/Core/ProtectedRoute";


const t: ThemeOptions = {
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {}
            }
        }
    },
    palette: {
        primary: {
            main: "#01A58D",
        },
        secondary: {
            main: "#F7715D",
        },
    }
}

const theme = createTheme(t);
const darkTheme = createTheme({...t, palette: {...t.palette, mode: "dark"}})

function App() {
    const [darkMode] = useAtom(darkModeAtom)
    const [user] = useAtom(userAtom)


    return (
        <ThemeProvider theme={darkMode ? darkTheme : theme}>
            <CssBaseline/>

            {/* main component */}
            {
                <Router>
                    {/* show top bar - only in non-login pages */}
                    {user && <ResponsiveAppBar/>}
                    {<Routes>
                        {/* all routes except login - protected */}
                        <Route element={<ProtectedRoute/>}>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/pet/:id" element={<PetProfilePage/>}/>
                            <Route path="/user/:id" element={<UserProfilePage/>}/>
                        </Route>
                        {/* signin route */}
                        <Route path="/signin" element={<SignInPage/>}/>
                        {/* default route - main */}
                        <Route
                            path="*"
                            element={<Navigate to="/" replace={true}/>}
                        />
                    </Routes>}
                </Router>
            }

        </ThemeProvider>
    );
}

export default App;
