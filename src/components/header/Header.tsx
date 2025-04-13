import {
    AppBar, Box, Button,
    Toolbar,
    Typography,
} from '@mui/material';
import { routes } from '../../routes';
import ButtonLink from "../button-link/ButtonLink.tsx";
import useAuth from "../../hooks/use-auth.ts";
import { logout } from "../../api/auth.ts";

const Header = () => {
    const { isAuthorized } = useAuth();

    return (
        <AppBar position="sticky" sx={{ padding: 0.5}}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Codelang
                </Typography>

                {isAuthorized
                    ? <Box>
                        <ButtonLink to={routes.createQuestion}>
                            Ask question
                        </ButtonLink>
                        <Button color={'inherit'} onClick={logout}>
                            Logout
                        </Button>
                    </Box>

                    : <ButtonLink to={routes.login}>
                        Login
                    </ButtonLink>
                }
            </Toolbar>
        </AppBar>
    );
};

export default Header;
