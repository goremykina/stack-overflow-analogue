// src/components/Header.tsx
// import React from 'react';
import { AppBar, Toolbar, Typography, Button, Select } from '@mui/material';

const Header = () => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Codelang
                </Typography>
                <Button color="inherit">Login</Button>
                <Select label={'lang'}></Select>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
