import { Drawer, List, ListItemButton } from "@mui/material";
import HouseIcon from '@mui/icons-material/House';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import theme from '../../theme';
import Link from "../link/Link";

const SideBar = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 300,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: 300,
                    boxSizing: "border-box",
                    position: "relative",
                    background: `${theme.palette.primary.main}`,
                    borderTop: '1.5px solid rgba(0, 0, 0, 0.12);\n' + '}',
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
                },
            }}
        >
            <List sx={{ display: "flex", flexDirection: "column"}}>
                <Link color={'inherit'} underline={'none'} to={'/'}>
                    <ListItemButton sx={{ display: "flex", gap: 2 }}>
                        <HouseIcon />
                        Home
                    </ListItemButton>
                </Link>

                <Link color={'inherit'} underline={'none'} to={'/'}>
                    <ListItemButton sx={{ display: "flex", gap: 2 }}>
                        <PersonOutlineIcon />
                        My Account
                    </ListItemButton>
                </Link>

                <Link color={'inherit'} underline={'none'} to={'/'}>
                    <ListItemButton sx={{ display: "flex", gap: 2 }}>
                        <TextSnippetIcon />
                        Post snippet
                    </ListItemButton>
                </Link>

                <Link color={'inherit'} underline={'none'} to={'/'}>
                    <ListItemButton sx={{ display: "flex", gap: 2 }}>
                        <TextSnippetIcon />
                        My snippet
                    </ListItemButton>
                </Link>

                <Link color={'inherit'} underline={'none'} to={'/'}>
                    <ListItemButton sx={{ display: "flex", gap: 2 }}>
                        <QuestionMarkIcon />
                        Questions
                    </ListItemButton>
                </Link>

                <Link color={'inherit'} underline={'none'} to={'/'}>
                    <ListItemButton sx={{ display: "flex", gap: 2 }}>
                        <PeopleOutlineIcon />
                        Users
                    </ListItemButton>
                </Link>
            </List>
        </Drawer>
    );
};

export default SideBar;
