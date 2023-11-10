import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { SideBarItem } from "./SidebarItem";

export const Sidebar = ({ drawerWidth = 240 }) => {

    const { displayName } = useSelector( state => state.auth );
    const { notes } = useSelector( state => state.journal );

    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >

            <Drawer
                variant='permanent' //temporary
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } // MODIFICA A UNA CLASE EXISTENTE
                }}
            >
                <Toolbar>
                    <Typography variant='h6' noWrap component='div'> { displayName } </Typography>
                </Toolbar>

                <Divider />

                <List>
                    {
                        notes.map( item => (
                            <SideBarItem key={ item.id } { ...item } />
                        ))
                    }
                </List>

            </Drawer>

        </Box>
    )
}
