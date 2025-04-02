import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <Drawer
            anchor="left"
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
            }}
        >
            <List>
                <ListItem component={Link} to="/">
                    <ListItemText primary="Home" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
