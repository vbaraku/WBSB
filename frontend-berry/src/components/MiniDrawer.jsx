import { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { ListSubheader } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Collapse from '@mui/material/Collapse';
import useWindowDimensions from '../utils/useWindowDimensions';

const drawerWidth = 240;

export default function ResponsiveDrawer({ categories, selectedQuestion, setSelectedQuestion, drawerOpen }) {
    const { width } = useWindowDimensions();

    return (
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
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
