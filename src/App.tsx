import 'Styles/App.css';
import React from "react";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {CssBaseline} from "@mui/material";
import {useAtom} from "jotai";
import {darkModeAtom, userAtom} from "./Atoms";
import {SignIn} from "Components/Pages/SignIn";
import {Main} from "./Components/Pages/Main";
import ResponsiveAppBar from "./Components/Core/AppBar";

const theme = createTheme({
    palette: {
        primary: {
            main: "#01A58D",
        },
        secondary: {
            main: "#F7715D",
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#01A58D",
        },
        secondary: {
            main: "#F7715D",
        },
    },
})

function App() {
    const [darkMode] = useAtom(darkModeAtom)
    const [user] = useAtom(userAtom)


    return (
        <ThemeProvider theme={darkMode ? darkTheme : theme}>
            <CssBaseline/>


            {/* main component */}
            {
                !user ? <SignIn/> :
                    <>
                        <ResponsiveAppBar/>
                        <Main/>
                    </>

            }

        </ThemeProvider>
    );
}

export default App;
