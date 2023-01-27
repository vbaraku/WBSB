import { Button, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function OrderQuestions() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Pyetja',
            width: 700,
            editable: true
        },
        {
            field: 'category',
            headerName: 'Kategoria',
            width: 450,
            editable: true
        },
        {
            field: 'order',
            headerName: 'Renditja',
            type: 'number',
            width: 110,
            editable: true
        }
    ];

    const rows = [
        { id: 1, name: 'Sa i besoni Administrates se Komunes', category: 'Besimi ne institucione', order: 99 },
        { id: 2, name: 'Sa i besoni Administrates se Komunes', category: 'Besimi ne institucione', order: 99 },
        { id: 3, name: 'Sa i besoni Administrates se Komunes', category: 'Besimi ne institucione', order: 99 }
    ];

    const drawerWidth = 240;

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
            </Box>
        </Box>
    );
}
