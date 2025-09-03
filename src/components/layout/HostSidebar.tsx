// import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Typography,
    Box,
    Divider,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AddHomeIcon from '@mui/icons-material/AddHome';
import HistoryIcon from '@mui/icons-material/History';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaymentIcon from '@mui/icons-material/Payment';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import SettingsIcon from '@mui/icons-material/Settings';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector } from 'react-redux';
import { UserType } from '../../types/type';

const menuItems = [
    { text: 'Profile', icon: <PersonIcon /> },
    { text: 'Home', icon: <HomeIcon /> },
    { text: 'Add Property', icon: <AddHomeIcon /> },
    { text: 'Booking History', icon: <HistoryIcon /> },
    { text: 'Invoices', icon: <ReceiptIcon /> },
    { text: 'Payout', icon: <PaymentIcon /> },
    { text: 'Privacy Policy', icon: <PrivacyTipIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
    { text: 'Switch to Renter', icon: <SwapHorizIcon /> },
    { text: 'Logout', icon: <LogoutIcon /> },
];

const drawerWidth = 240;

export const HostSidebar = () => {
    const { data } = useSelector(({ auth }:{auth:{data:UserType}}) => auth)
    console.log(data,"data");
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: '#C14365 !important',
                    color: '#fff',
                },
            }}
        >
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Welcome, {data?.user_fullName}
                </Typography>
            </Box>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.3)' }} />
            <List>
                {menuItems.map((item) => (
                    <ListItem
                        // button
                        key={item.text}
                        component="div"
                        sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};
