import React from "react";
import {Button, Box, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";

export const PetPaper = () => {

    return (
        <Paper elevation={3}>
            <Box sx={{p: 3}}>
                <Typography variant={'h3'}>Name</Typography>
                <Typography sx={{mt: 2}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </Typography>
                <Button variant={'contained'} color={'secondary'} sx={{mt: 2}}>
                    View Profile
                </Button>
            </Box>

        </Paper>

    )
}