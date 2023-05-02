import { Button, Box, Select, MenuItem, Menu } from '@mui/material';
import { DataGrid, useGridApiContext } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function OrderQuestions() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [changes, setChanges] = useState([]);
    function mergeCategories(categories) {
        // The data comes in the form of an array of categories, each category has an array of questions
        // Some categories have the same name, but start with 3 different first characters. These need to be merged. The first 3 characters dictate the order of the categories

        // First, we need to find the categories that need to be merged
        const categoriesToMerge = {};
        for (let i = 0; i < categories.length; i += 1) {
            const category = categories[i].category;
            if (categoriesToMerge[category.substring(3)]) {
                categoriesToMerge[category.substring(3)].questions = categoriesToMerge[category.substring(3)].questions.concat(
                    categories[i].questions
                );
            } else {
                categoriesToMerge[category.substring(3)] = categories[i];
            }
        }

        // Now we need to sort the categories by the category name
        const sortedCategories = Object.values(categoriesToMerge).sort((a, b) => {
            if (a.category < b.category) {
                return -1;
            }
            if (a.category > b.category) {
                return 1;
            }
            return 0;
        });

        sortedCategories.forEach((category) => {
            category.questions.sort((a, b) => {
                if (a.text < b.text) {
                    return -1;
                }
                if (a.text > b.text) {
                    return 1;
                }
                return 0;
            });
        });

        // remove the first 3 characters from the category name
        sortedCategories.forEach((category) => {
            category.category = category.category.substring(3);
        });

        return sortedCategories;
    }

    const handleSave = () => {
        axios.post('/api/questions/order', changes).then((response) => {
            console.log(response);
            alert('Changes saved');
        });
    };

    useEffect(() => {
        // alert('hello');
    }, [categories]);
    useEffect(() => {
        axios
            .get('/api/questions', {
                params: {
                    language: 'ALB'
                }
            })
            .then((response) => {
                const data = mergeCategories(response.data);
                setCategories(data);
                setSelectedCategory(data[0]);
            });
    }, []);
    const columns = [
        // { field: 'id', headerName: 'ID', flex: 1 },
        {
            field: 'text',
            headerName: 'Pyetja',
            flex: 10,
            editable: false
        },
        {
            field: 'rank',
            headerName: 'Renditja',
            type: 'number',
            flex: 1,
            editable: true,
            renderEditCell: (params) => <CustomEditComponent {...params} setChanges={setChanges} />
        }
    ];

    const rows = [
        { id: 1, name: 'Sa i besoni Administrates se Komunes', category: 'Besimi ne institucione', order: 99 },
        { id: 2, name: 'Sa i besoni Administrates se Komunes', category: 'Besimi ne institucione', order: 99 },
        { id: 3, name: 'Sa i besoni Administrates se Komunes', category: 'Besimi ne institucione', order: 99 }
    ];

    const drawerWidth = 240;

    if (!categories.length) {
        return <div>Loading...</div>;
    }
    return (
        // <Box sx={{ display: 'flex' }}>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            {
                // 1. Zgjidhe categoryy
                // Click on renditja cell to edit
                // switching category does not save it
                // click save to save changes
            }
            <Box
                component="main"
                className="graph-wrapper"
                sx={{
                    borderRadius: '10px 10px 10px 10px',
                    backgroundColor: '#e3f2fd',
                    flexGrow: 1
                    // width: { sm: `calc(100% - ${drawerWidth}px)` }
                }}
            >
                <span>
                    1. Zgjedhni Kategorine per te cilen doni te ndrroni renditjen e pyetjeve. <br />
                    2. Klikoni tek &lsquo;Renditja&lsquo; dhe zgjedhni renditjen. Renditja e pytjeve eshe ne formen: 1,2,3... <br />
                    3. Klikoni &lsquo;Ruaj&lsquo; per te ruajtur ndryshimet. Kujdes nese ndrroni kategorine apo faqen, ndryshimet do humbin.
                </span>
                <hr />
                <b>Kategoria:</b>{' '}
                <Select
                    value={selectedCategory ? selectedCategory.category : ''}
                    onChange={(e) => setSelectedCategory(categories.find((category) => category.category === e.target.value))}
                    style={{ backgroundColor: 'white' }}
                >
                    {categories.map((category) => (
                        // use MUI select options
                        <MenuItem value={category.category}>{category.category}</MenuItem>
                    ))}
                </Select>
                <Box sx={{ height: 700, width: '100%', backgroundColor: 'white' }}>
                    <DataGrid
                        rows={selectedCategory ? selectedCategory.questions : []}
                        columns={columns}
                        pageSize={100}
                        rowsPerPageOptions={[100]}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                    />
                </Box>
                <Button variant="contained" onClick={handleSave}>
                    Ruaj
                </Button>
            </Box>
        </div>
        // </Box>
    );
}

function CustomEditComponent(props) {
    const { id, value, field, setChanges } = props;
    console.log(props);
    const apiRef = useGridApiContext();

    const handleValueChange = (event) => {
        const newValue = event.target.value; // The new value entered by the user
        apiRef.current.setEditCellValue({ id, field, value: newValue });
        setChanges((prev) => {
            const newChanges = prev.filter((change) => change.id !== id);
            newChanges.push({ id, value: newValue });
            return newChanges;
        });
    };

    return <input key={id} type="number" style={{ width: '90%' }} value={value} onChange={handleValueChange} />;
}
