import * as React from 'react';
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

// import SendIcon from '@mui/icons-material/Send';
// import {
//   albanian_dict,
//   english_dict,
//   kosovar_dict,
// } from ".../utils/dictionaries";

const drawerWidth = 240;

const pages = ['Kosova', 'Shqipëria', 'Serbia'];

// const openedMixin = (theme) => ({
//     width: drawerWidth,
//     transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen
//     }),
//     overflowX: 'hidden'
// });

// const closedMixin = (theme) => ({
//     transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen
//     }),
//     overflowX: 'hidden',
//     width: `calc(${theme.spacing(7)} + 1px)`,
//     [theme.breakpoints.up('sm')]: {
//         width: `calc(${theme.spacing(8)} + 1px)`
//     }
// });

// const DrawerHeader = styled('div')(({ theme }) => ({
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar
// }));

// const AppBar = styled(MuiAppBar, {
//     shouldForwardProp: (prop) => prop !== 'open'
// })(({ theme, open }) => ({
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(['width', 'margin'], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen
//     }),
//     ...(open && {
//         marginLeft: drawerWidth,
//         width: `calc(100% - ${drawerWidth}px)`,
//         transition: theme.transitions.create(['width', 'margin'], {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen
//         })
//     })
// }));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     ...(open && {
//         ...openedMixin(theme),
//         '& .MuiDrawer-paper': openedMixin(theme)
//     }),
//     ...(!open && {
//         ...closedMixin(theme),
//         '& .MuiDrawer-paper': closedMixin(theme)
//     })
// }));

// export default function MiniDrawer() {
//     const theme = useTheme();
//     const [open, setOpen] = React.useState(false);

//     const handleDrawerOpen = () => {
//         setOpen(true);
//     };

//     const handleDrawerClose = () => {
//         setOpen(false);
//     };

//     return (
//         // <Box sx={{ display: 'flex' }}>
//         //     <CssBaseline />
//         //     <AppBar position="fixed" open={open}>
//         //         <Toolbar>
//         //             <IconButton
//         //                 color="inherit"
//         //                 aria-label="open drawer"
//         //                 onClick={handleDrawerOpen}
//         //                 edge="start"
//         //                 sx={{
//         //                     marginRight: 5,
//         //                     ...(open && { display: 'none' })
//         //                 }}
//         //             >
//         //                 <MenuIcon />
//         //             </IconButton>
//         //             <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//         //                 {pages.map((page) => (
//         //                     <Button variant="text" key={page} onClick={handleClick} sx={{ color: 'white' }}>
//         //                         {page}
//         //                     </Button>
//         //                 ))}
//         //             </Box>
//         //         </Toolbar>
//         //     </AppBar>
//         //     <Drawer variant="temporary" open={open}>
//         //         <DrawerHeader>
//         //             <IconButton onClick={handleDrawerClose}>
//         //                 {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
//         //             </IconButton>
//         //         </DrawerHeader>
//         //         <Divider />
//         //         <List>
//         //             {['Pytja 1', 'Pytja 2', 'Pytja 3', 'Pytja 4'].map((text, index) => (
//         //                 <>
//         //                     <ListItem key={text} disablePadding sx={{ display: 'block' }}>
//         //                         <ListItemButton
//         //                             sx={{
//         //                                 minHeight: 48,
//         //                                 justifyContent: open ? 'initial' : 'center',
//         //                                 px: 2.5
//         //                             }}
//         //                         >
//         //                             <ListItemIcon
//         //                                 sx={{
//         //                                     minWidth: 0,
//         //                                     mr: open ? 3 : 'auto',
//         //                                     justifyContent: 'center'
//         //                                 }}
//         //                             >
//         //                                 <HelpCenterRoundedIcon />
//         //                             </ListItemIcon>
//         //                             <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
//         //                         </ListItemButton>
//         //                         <Divider />
//         //                     </ListItem>
//         //                 </>
//         //             ))}
//         //         </List>
//         //     </Drawer>
//         //     <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         //         <DrawerHeader />
//         //     </Box>
//         // </Box>

//     );
// }

export default function ResponsiveDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const [open, setOpen] = React.useState(false);

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
                    </ListSubheader>
                }
            >
                <ListItemButton>
                    <ListItemText primary="Category" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemText primary="Category" />
                </ListItemButton>
                <ListItemButton
                    onClick={() => {
                        setOpen((curr) => !curr);
                    }}
                >
                    <ListItemIcon>{/* <InboxIcon /> */}</ListItemIcon>
                    <ListItemText primary="Category" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary="Starred" />
                        </ListItemButton>
                    </List>
                </Collapse>
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
