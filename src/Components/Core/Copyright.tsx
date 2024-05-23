import Typography, {TypographyProps} from "@mui/material/Typography";
import Link from "@mui/material/Link";
import React from "react";

export function Copyright(props: TypographyProps) {
    return (
        <Typography
            variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit">
                Pets by Daniel & Yolanda
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}