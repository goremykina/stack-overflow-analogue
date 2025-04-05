import {
    AppBar,
    Toolbar,
    Typography,
} from '@mui/material';
import { routes } from '../../routes';
import ButtonLink from "../button-link/ButtonLink.tsx";

const Header = () => {
    return (
        <AppBar position="sticky" sx={{ padding: 0.5}}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Codelang
                </Typography>

                <ButtonLink to={routes.login}>
                    Login
                </ButtonLink>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
