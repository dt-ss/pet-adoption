import Typography, {TypographyProps} from "@mui/material/Typography";
import Link from "@mui/material/Link";
import React from "react";
import {useLocation} from "react-router-dom";

/**
 * bottom copyright component
 * @param props
 * @constructor
 */
export function Copyright(props: TypographyProps) {
    const location = useLocation()
    return (
        location.pathname !== '/signin' &&
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