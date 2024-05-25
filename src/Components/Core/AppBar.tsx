import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Pets} from "@mui/icons-material";
import {userAtom} from "../../Atoms";
import {useAtom} from "jotai";
import {Link, useNavigate} from "react-router-dom";

const settings = ['Profile', 'Logout'] as const;
type Setting = typeof settings[number];

type PageType = { name: string, path: string }
const pages: PageType[] = [{name: 'main', path: '/'}] as const;
// type Page = typeof pages[number];

const Logo = ({isMobile}: { isMobile: boolean }) => {

    return (
        <>
            <Pets sx={{display: {xs: isMobile ? 'flex' : 'none', md: isMobile ? 'none' : 'flex'}, mr: 1}}/>
            <Typography
                variant={isMobile ? "h5" : "h6"}
                noWrap
                component="a"
                sx={{
                    mr: 2,
                    display: {xs: isMobile ? 'flex' : 'none', md: isMobile ? 'none' : 'flex'},
                    flexGrow: isMobile ? 1 : undefined,
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                PETS
            </Typography>
        </>
    )
}

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState <null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState <null | HTMLElement>(null);
    const [user,setUser] = useAtom(userAtom)
    const navigate = useNavigate()

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (setting?: Setting) => {
        setting === 'Logout' && setUser(null)
        setting === 'Profile' && user && navigate(`/user/${user.id}`)
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    {/* logo desktop */}
                    <Logo isMobile={false}/>

                    {/* pages menu - mobile */}
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={()=>handleCloseNavMenu()}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} component={Link} to={page.path}
                                          onClick={() => handleCloseNavMenu()}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* logo mobile */}
                    <Logo isMobile={true}/>

                    {/* pages menu - desktop */}
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                component={Link}
                                to={page.path}
                                key={page.name}
                                onClick={() => handleCloseNavMenu()}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    {/* user avatar and settings menu */}
                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar alt="Remy Sharp"/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={()=>handleCloseUserMenu()}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;