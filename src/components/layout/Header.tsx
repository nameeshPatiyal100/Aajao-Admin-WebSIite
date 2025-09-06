import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Box,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    const menuItems = [
        { label: 'Home', to: '/' },
        { label: 'About Us', to: '/about' },
        { label: 'Blogs', to: '/' },
        { label: 'Rooms', to: '/' },
        { label: 'Contact', to: '/contact' },
    ];

    return (
        <>
            <AppBar position="sticky" elevation={1} sx={{ bgcolor: '#FFFFFF', color: '#6B240C' }}>
                <Toolbar>
                    {/* Logo */}
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <img src={logo} alt="Logo" style={{ height: 40, marginRight: 8 }} />
                    </Link>

                    <Box flexGrow={1} />

                    {/* Desktop View */}
                    {!isMobile && (
                        <>
                            <Box sx={{ display: 'flex', gap: 3 }}>
                                {menuItems.map((item) => (
                                    <Button
                                        key={item.to}
                                        component={Link}
                                        to={item.to}
                                        sx={{
                                            textTransform: 'none',
                                            color: '#C14365',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </Box>

                            <Box sx={{ display: 'flex', gap: 2, marginLeft: 4 }}>
                                <Button
                                    onClick={() => navigate('/auth/login')}
                                    variant="outlined"
                                    sx={{
                                        textTransform: 'none',
                                        color: '#C14365',
                                        borderColor: '#6B240C',
                                        '&:hover': {
                                            bgcolor: '#F2D0C4',
                                            borderColor: '#6B240C',
                                        },
                                    }}
                                >
                                    Login
                                </Button>
                                <Button
                                    onClick={() => navigate('/auth/signup')}
                                    variant="contained"
                                     sx={{
                                    textTransform: 'none',
                                    bgcolor: '#c14365',
                                    color: '#fff',
                                    '&:hover': {
                                        bgcolor: '#94605A',
                                    },
                                }}
                                >
                                    Register
                                </Button>
                            </Box>
                        </>
                    )}

                    {/* Mobile View Menu Button */}
                    {isMobile && (
                        <IconButton edge="end" onClick={toggleDrawer(true)}>
                            <MenuIcon sx={{ color: '#6B240C' }} />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>

            {/* Drawer for Mobile View */}
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250, p: 2, bgcolor: '#FFF', height: '100%' }}>
                    <List>
                        {menuItems.map((item) => (
                            <ListItem
                                // button
                                key={item.to}
                                component={Link}
                                to={item.to}
                                onClick={toggleDrawer(false)}
                            >
                                <ListItemText primary={item.label} sx={{ color: '#6B240C' }} />
                            </ListItem>
                        ))}

                        <ListItem>
                            <Button
                                fullWidth
                                onClick={() => {
                                    navigate('/auth/login');
                                    setDrawerOpen(false);
                                }}
                                variant="outlined"
                                sx={{
                                    color: '#6B240C',
                                    borderColor: '#6B240C',
                                    textTransform: 'none',
                                    mt: 2,
                                    '&:hover': { bgcolor: '#F2D0C4' },
                                }}
                            >
                                Login
                            </Button>
                        </ListItem>

                        <ListItem>
                            <Button
                                fullWidth
                                onClick={() => {
                                    navigate('/auth/signup');
                                    setDrawerOpen(false);
                                }}
                                variant="contained"
                                sx={{
                                    textTransform: 'none',
                                    bgcolor: '#A9746E',
                                    color: '#fff',
                                    '&:hover': {
                                        bgcolor: '#94605A',
                                    },
                                }}

                            >
                                Register
                            </Button>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Header;
