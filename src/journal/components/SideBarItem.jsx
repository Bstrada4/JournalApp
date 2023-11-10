import { TurnedInNot } from "@mui/icons-material";
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useMemo } from 'react';
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";


export const SideBarItem = ({ id, title, body, date, imageUrl = [] }) => {

    const dispatch =  useDispatch();
    
    const newTit = useMemo(() => {
        return title.length > 17
        ? title.substring(0,17) + '...'
        : title
    }, [ title ]);


    const activeNote = {
        id: id,
        title: newTit,
        body: body,
        date: date,
        imageUrl: imageUrl
    }
    
    const onClickItem = ( e ) => {
        dispatch( setActiveNote( activeNote ) );
    }
    
    return (
        <>
            <ListItem key={ id } onClick={ onClickItem } disablePadding >
                <ListItemButton>
                    <ListItemIcon>
                        <TurnedInNot />
                    </ListItemIcon>

                    <Grid container>
                        <ListItemText primary={ newTit } />
                        <ListItemText secondary={ body } />
                    </Grid>


                </ListItemButton>
            </ListItem>
        </>
    )
   
}
