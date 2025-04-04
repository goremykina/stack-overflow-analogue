import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Link
} from '@mui/material';

const Header = () => {
    return (
        <AppBar position="sticky" sx={{ padding: 0.5}}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Codelang
                </Typography>

                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
