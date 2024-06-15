import React, {useEffect, useState} from 'react';
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
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {styled, alpha} from '@mui/material/styles';
import {userAtom} from "../../Atoms";
import {useAtom} from "jotai";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Popover from '@mui/material/Popover';
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import {SelectChangeEvent} from '@mui/material/Select';
import FilterListIcon from '@mui/icons-material/FilterList';
import {PetType} from "../../Model/PetModel";
import {enumToObject} from "../../utils";


// object used at pet type dropdown
const petTypeObject = enumToObject(PetType)

// pages list
type PageType = { name: string, path: string }


/**
 * logo component - mobile version or not
 * @param isMobile
 * @constructor
 */
const Logo = ({isMobile}: { isMobile: boolean }) => (
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
);

// search bar style
const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

// search icon style
const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

// search input style
const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

/**
 * top app bar base component
 * @constructor
 */
function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [anchorElFilter, setAnchorElFilter] = useState<null | HTMLElement>(null);
    const [user, setUser] = useAtom(userAtom);
    const [search, setSearch] = useState('');
    const [ageRange, setAgeRange] = useState<number[]>([0, 40]);
    const [petType, setPetType] = useState<string>('');
    const navigate = useNavigate();
    const location = useLocation()
    const [pages, setPages] = useState<PageType[]>([]);

    useEffect(() => {
        setPages([
            {name: 'main', path: '/'},
            ...(user ? [{name: 'add pet', path: '/register-pet'}] : [])
        ])
    }, [user]);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleOpenFilterMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElFilter(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (setting?: string) => {
        if (setting === 'Logout') setUser(null);
        if (setting === 'Profile' && user) navigate(`/user/${user.id}`);
        if (setting === 'Login') navigate(`/signin`);
        setAnchorElUser(null);
    };

    const handleCloseFilterMenu = () => {
        setAnchorElFilter(null);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        navigate(`/?query=${search}&minAge=${ageRange[0]}&maxAge=${ageRange[1]}&petType=${petType}`);
    };

    const handleAgeRangeChange = (event: Event, newValue: number | number[]) => {
        setAgeRange(newValue as number[]);
    };

    const handlePetTypeChange = (event: SelectChangeEvent) => {
        setPetType(event.target.value as string);
    };

    return (
        location.pathname !== '/signin' &&
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
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} component={Link} to={page.path} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page.name.toUpperCase()}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* logo mobile */}
                    <Logo isMobile={true}/>

                    {/* pages menu - desktop */}
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                component={Link}
                                to={page.path}
                                key={page.name}
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                {page.name.toUpperCase()}
                            </Button>
                        ))}
                    </Box>

                    {/* center search form */}
                    <Box sx={{flexGrow: 1, display: 'flex', justifyContent: 'center'}}>
                        <form style={{display: 'flex', alignItems: 'center'}} onSubmit={handleSearchSubmit}>
                            <Search sx={{flexGrow: 1, mx: 2}}>
                                <SearchIconWrapper>
                                    <SearchIcon/>
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search Pet Name…"
                                    inputProps={{'aria-label': 'search'}}
                                    value={search}
                                    onChange={handleSearchChange}
                                />
                            </Search>

                            {/* filter button */}
                            <IconButton
                                color="inherit"
                                onClick={handleOpenFilterMenu}
                                sx={{mr: 2}}
                            >
                                <FilterListIcon/>
                            </IconButton>
                            <Popover
                                id="filter-menu"
                                anchorEl={anchorElFilter}
                                open={Boolean(anchorElFilter)}
                                onClose={handleCloseFilterMenu}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                <Box sx={{p: 2, minWidth: 250}}>
                                    <Typography variant="h6">Filter Pets</Typography>
                                    <Typography variant="subtitle1">Age Range</Typography>
                                    <Slider
                                        value={ageRange}
                                        onChange={handleAgeRangeChange}
                                        valueLabelDisplay="auto"
                                        min={0}
                                        max={40}
                                    />
                                    <FormControl fullWidth sx={{mt: 2}}>
                                        <InputLabel id="pet-type-label">Pet Type</InputLabel>
                                        <Select
                                            labelId="pet-type-label"
                                            id="pet-type"
                                            value={petType}
                                            label="Pet Type"
                                            onChange={handlePetTypeChange}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {Object.keys(petTypeObject).map((t) =>
                                                <MenuItem key={t} value={petTypeObject[t]}>
                                                    {t}
                                                </MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Popover>

                            <Button type="submit" variant="outlined" color="inherit" sx={{mr: 2}}>
                                Search
                            </Button>
                        </form>
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
                            onClose={() => handleCloseUserMenu()}
                        >
                            {(user ? ['Profile', 'Logout'] : ['Login']).map((setting) => (
                                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                                    <Typography textAlign="center">{setting.toUpperCase()}</Typography>
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
