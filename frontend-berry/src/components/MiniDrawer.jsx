import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Button } from 'react-bootstrap';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { ListSubheader } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Collapse from '@mui/material/Collapse';
import { albanianDict, englishDict, serbianDict } from '../utils/dictionaries';
import useWindowDimensions from '../utils/useWindowDimensions';

const drawerWidth = 240;

export default function ResponsiveDrawer({
    categories,
    selectedQuestion,
    setSelectedQuestion,
    selectedCountry,
    setSelectedCountry,
    selectedLanguage,
    setSelectedLanguage,
    drawerOpen
}) {
    const { height, width } = useWindowDimensions();

    const [countryValues] = useState(englishDict.COUNTRIES);

    const languages = ['ALB', 'ENG', 'SRB'];
    const countries = albanianDict.COUNTRIES;

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    console.log(selectedLanguage);

    // const [open, setOpen] = React.useState(false);

    const handleCountryChange = (index) => {
        setSelectedCountry(countryValues[index]);
    };

    const handleLanguageChange = (value) => {
        setSelectedLanguage(value);
    };
    // const drawer = (

    // );

    const container = window !== undefined ? () => window().document.body : undefined;

    const displayDrawer = () => {
        if (window.innerWidth > 400) {
            return 'block';
        }
        return 'none';
    };
    return (
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
            {/* <AppBar
                // position=""
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` }
                }}
                md={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` }
                }}
            > */}
            {/* <Toolbar> */}

            {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
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
                    </Box> */}
            {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {languages.map((language) => (
                            <Button
                                variant="contained"
                                size="Large"
                                key={language}
                                sx={{
                                    marginLeft: 1.5,
                                    color: 'white',
                                    backgroundColor: selectedLanguage === language,
                                    '&.MuiButtonBase-root:hover': {
                                        bgcolor: 'transparent'
                                    }
                                }}
                                onClick={(e) => {
                                    handleLanguageChange(language);
                                }}
                            >
                                {language}
                            </Button>
                        ))}
                    </Box> */}
            {/* </Toolbar> */}
            {/* </AppBar> */}

            <Box
                component="nav"
                sx={{ position: '', width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
                className="question-drawer"
                display={width > 768 || drawerOpen ? 'block' : 'none'}
            >
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
            </Box>
        </Box>
    );
}

const Category = ({ category, setSelectedQuestion, selectedQuestion }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <ListItemButton
                onClick={(e) => {
                    setOpen((curr) => !curr);
                    e.stopPropagation();
                }}
                className="category"
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
                        key={index}
                        component="div"
                        disablePadding
                        style={{ backgroundColor: q?.id === selectedQuestion?.id ? '#e3f2fd' : '' }}
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
                            <ListItemText primary={` - ${q.text}`} />
                        </ListItemButton>
                    </List>
                ))}
            </Collapse>
        </>
    );
};
