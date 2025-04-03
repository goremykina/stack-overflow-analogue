import { Drawer, List, ListItemButton, ListItemText} from "@mui/material";
import HouseIcon from '@mui/icons-material/House';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import theme from '../../theme';

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
                <ListItemButton component="a" href="/" sx={{ display: "flex", gap: 2 }}>
                    <HouseIcon />
                    <ListItemText primary="Home" sx={{ fontSize: 16, margin: 0 }} />
                </ListItemButton>

                <ListItemButton component="a" href="/" sx={{ display: "flex", gap: 2 }}>
                    <PersonOutlineIcon/>
                    <ListItemText primary="My Account" />
                </ListItemButton>

                <ListItemButton component="a" href="/" sx={{ display: "flex", gap: 2 }}>
                    <TextSnippetIcon />
                    <ListItemText primary="Post snippet" />
                </ListItemButton>

                <ListItemButton component="a" href="/" sx={{ display: "flex", gap: 2 }}>
                    <TextSnippetIcon />
                    <ListItemText primary="My snippet" />
                </ListItemButton>

                <ListItemButton component="a" href="/" sx={{ display: "flex", gap: 2 }}>
                    <QuestionMarkIcon />
                    <ListItemText primary="Questions" />
                </ListItemButton>

                <ListItemButton component="a" href="/" sx={{ display: "flex", gap: 2 }}>
                    <PeopleOutlineIcon />
                    <ListItemText primary="Users" />
                </ListItemButton>
            </List>
        </Drawer>
    );
};

export default SideBar;
