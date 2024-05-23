import {DarkModeOutlined, LightModeOutlined} from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import React from "react";
import {useAtom} from "jotai";
import {darkModeAtom} from "Atoms";


export const ThemeModeSwitch = () => {
    const [darkMode, setDarkMode] = useAtom(darkModeAtom)
    return (
        <Avatar onClick={() => setDarkMode((last: boolean) => !last)}
                sx={{m: 1, position: "absolute", cursor: "pointer", right: 2, top: 2, bgcolor: 'primary.main'}}>
            {darkMode ? <LightModeOutlined/> : <DarkModeOutlined/>}
        </Avatar>
    )
}