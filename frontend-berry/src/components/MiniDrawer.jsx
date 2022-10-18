import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Button from '@mui/material/Button';
import HelpCenterRoundedIcon from '@mui/icons-material/HelpCenterRounded';
import { ListSubheader } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Collapse from '@mui/material/Collapse';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import SendIcon from '@mui/icons-material/Send';
import { albanianDict, englishtDict, serbianDict } from '../utils/dictionaries';

const drawerWidth = 240;

const countries = albanianDict.COUNTRIES;
const countryValues = englishtDict.COUNTRIES;

export default function ResponsiveDrawer({
    window,
    categories,
    selectedQuestion,
    setSelectedQuestion,
    selectedCountry,
    setSelectedCountry
}) {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // const [open, setOpen] = React.useState(false);

    const handleCountryChange = (index) => {
        setSelectedCountry(countryValues[index]);
    };
    const drawer = (
        <div>
            <Toolbar />

            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        {/* Nested List Items */}
                        WBSB
                    </ListSubheader>
                }
            >
                {categories.map((category, index) => (
                    <Category
                        key={index}
                        category={category}
                        setSelectedQuestion={setSelectedQuestion}
                        selectedQuestion={selectedQuestion}
                    />
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` }
                }}
                md={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` }
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {countries.map((page, index) => (
                            <Button
                                variant="contained"
                                size="Large"
                                key={page}
                                sx={{
                                    marginLeft: 1.5,
                                    color: 'white',
                                    backgroundColor: selectedCountry === countryValues[index] ? '#2E7193' : '',
                                    '&.MuiButtonBase-root:hover': {
                                        bgcolor: 'transparent'
                                    }
                                }}
                                onClick={() => {
                                    handleCountryChange(index);
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0, md: 0 } }} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

const Category = ({ category, setSelectedQuestion, selectedQuestion }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <ListItemButton
                onClick={() => {
                    setOpen((curr) => !curr);
                }}
            >
                {/* <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon> */}
                <ListItemText primary={category.category} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {category.questions.map((q, index) => (
                    <List
                        component="div"
                        disablePadding
                        style={{ backgroundColor: q.questionId === selectedQuestion.questionId ? '#ADD8E6' : '' }}
                    >
                        <ListItemButton
                            sx={{ pl: 4 }}
                            onClick={() => {
                                setSelectedQuestion(q);
                            }}
                        >
                            {/* <ListItemIcon>
                                <ArrowForwardIosIcon />
                            </ListItemIcon> */}
                            <ListItemText primary={` - ${q.questionText}`} />
                        </ListItemButton>
                    </List>
                ))}
            </Collapse>
        </>
    );
};
