import { useContext, useState } from 'react'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Stack } from '@mui/material';
import Collapse from "@mui/material/Collapse";
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;
    const [open, setOpen] = useState(false);

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    let username = "";
    if (auth.getUserInitials() != ""){
        username = auth.getUserName();
    }
    let published = "";
    
    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{borderRadius:"25px", p: "10px", bgcolor: '#8000F00F', marginTop: '15px', display: 'flex', p: 1 }}
            style={{transform:"translate(1%,0%)", width: '100%', fontSize: '12pt' }}
            button
            onDoubleClick={(event) => {
                handleToggleEdit(event)
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Box sx={{display: "flex", alignItems:"flex-start" }}>{idNamePair.name}</Box>
                </Grid>
                <Grid item xs={2}>
                    <Box sx={{display: "flex-start"}}>Likes and Dislikes </Box>
                </Grid>
                <Grid item xs={3}>
                    <Box sx={{p:2}}>By: {username}</Box>
                </Grid>
                <Grid item xs={5}>
                    <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end"}}>
                        <IconButton onClick={(event) => {
                                handleLoadList(event, idNamePair._id)
                            }} aria-label='delete'>
                            <KeyboardDoubleArrowDownIcon style={{fontSize:'20pt'}} />
                        </IconButton>
                        <Collapse in={open} timeout="auto" unmountOnExit></Collapse>
                    </Box>
                </Grid>    
                
            </Grid>
        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;