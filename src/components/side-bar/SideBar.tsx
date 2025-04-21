import { Drawer, List, ListItemButton } from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import theme from '../../theme';
import Link from "../link/Link";
import { routes } from "../../routes.ts";
import useAuth from "../../hooks/use-auth";

const SideBar = () => {
    const { isAuthorized } = useAuth();

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
                <Link color={'inherit'} underline={'none'} to={routes.home}>
                    <ListItemButton sx={{ display: "flex", gap: 2 }}>
                        <HomeOutlinedIcon />
                        Home
                    </ListItemButton>
                </Link>

                {isAuthorized && (
                    <>
                        <Link color={'inherit'} underline={'none'} to={routes.account}>
                            <ListItemButton sx={{ display: "flex", gap: 2 }}>
                                <PersonOutlineIcon />
                                My Account
                            </ListItemButton>
                        </Link>

                        <Link color={'inherit'} underline={'none'} to={routes.createPost}>
                            <ListItemButton sx={{ display: "flex", gap: 2 }}>
                                <TextSnippetOutlinedIcon />
                                Post snippet
                            </ListItemButton>
                        </Link>

                        <Link color={'inherit'} underline={'none'} to={routes.userPosts}>
                            <ListItemButton sx={{ display: "flex", gap: 2 }}>
                                <TextSnippetOutlinedIcon />
                                My snippets
                            </ListItemButton>
                        </Link>

                        <Link color={'inherit'} underline={'none'} to={routes.questions}>
                            <ListItemButton sx={{ display: "flex", gap: 2 }}>
                                <QuestionMarkIcon />
                                Questions
                            </ListItemButton>
                        </Link>

                        <Link color={'inherit'} underline={'none'} to={routes.users}>
                            <ListItemButton sx={{ display: "flex", gap: 2 }}>
                                <PeopleOutlineIcon />
                                Users
                            </ListItemButton>
                        </Link>
                    </>

                )}
            </List>
        </Drawer>
    );
};

export default SideBar;
