import { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Select,
    FormControl,
    SelectChangeEvent,
    MenuItem
} from '@mui/material';

const Header = () => {
    const [language, setLanguage] = useState('EN');

    const handleChange = (event: SelectChangeEvent) => {
        setLanguage(event.target.value);
    };

    return (
        <AppBar position="sticky" sx={{ padding: 0.5}}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Codelang
                </Typography>

                <Button color="inherit">Login</Button>

                <FormControl sx={{ width: 100, marginLeft: 3}}>
                    <Select
                        value={language}
                        onChange={handleChange}
                    >
                        <MenuItem value='RU'>RU</MenuItem>
                        <MenuItem value='PL'>PL</MenuItem>
                        <MenuItem value='EN'>EN</MenuItem>
                    </Select>
                </FormControl>

            </Toolbar>
        </AppBar>
    );
};

export default Header;
