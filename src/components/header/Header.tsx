import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Link
} from '@mui/material';
import { routes } from '../../routes';

const Header = () => {
    return (
        <AppBar position="sticky" sx={{ padding: 0.5}}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Codelang
                </Typography>

                <Button component={Link} color="inherit" href={routes.login}>Login</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
