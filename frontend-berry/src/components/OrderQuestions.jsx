import * as React from 'react';
import { Button, Box, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { InfinitySpin } from 'react-loader-spinner';

export default function OrderQuestions() {
    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        {
            field: 'name',
            headerName: 'Question',
            flex: 7,
            editable: true
        },
        {
            field: 'category',
            headerName: 'Category',
            flex: 4,
            editable: true
        },
        {
            field: 'order',
            headerName: 'Order',
            type: 'number',
            align: 'left',
            headerAlign: 'left',
            flex: 1,
            editable: true
        }
    ];

    const rows = [
        { id: 1, name: 'Sa i besoni Administrates se Komunes', category: 'Besimi ne institucione', order: 99 },
        { id: 2, name: 'Sa i besoni Administrates se Komunes', category: 'Besimi ne institucione', order: 99 },
        { id: 3, name: 'Sa i besoni Administrates se Komunes', category: 'Besimi ne institucione', order: 99 }
    ];

    const drawerWidth = 240;

    const [category, setCategory] = React.useState('');

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                component="main"
                className="graph-wrapper"
                sx={{
                    borderRadius: '10px 10px 10px 10px',
                    backgroundColor: '#e3f2fd',
                    flexGrow: 1,
                    width: { sm: `calc(100% - ${drawerWidth}px)` }
                }}
            >
                <Box sx={{ mb: 2, backgroundColor: 'white' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Category AAAAAAAAAAA</MenuItem>
                            <MenuItem value={20}>Category BBBBBBBBBBB</MenuItem>
                            <MenuItem value={30}>Category CCCCCCCCCCC</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                {category && (
                    <>
                        <Box sx={{ height: 700, width: '100%', backgroundColor: 'white' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                disableSelectionOnClick
                                experimentalFeatures={{ newEditingApi: true }}
                            />
                        </Box>
                        <Button variant="contained">Save</Button>
                    </>
                )}
                {!category && (
                    <Box sx={{ height: 700, width: '100%', backgroundColor: 'white', textAlign: 'center' }}>
                        <h1 style={{ textAlign: 'center', paddingTop: 25 }}>Pick a category</h1>
                        <InfinitySpin color="blue" />
                    </Box>
                )}
            </Box>
        </Box>
    );
}
