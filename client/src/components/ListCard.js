import { useContext, useState } from 'react'
import AuthContext from '../auth';
import React from 'react';
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';

import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import {Accordion, AccordionSummary, AccordionDetails, Typography} from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import WorkspaceScreen from './WorkspaceScreen';


/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [isChecked, setIsChecked] = React.useState(false);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;
    const [open, setOpen] = useState(false);
    const [ expanded, setExpanded ] = useState(false);
    let deleteButton = <div></div>;
    const accordionData = {
        title: "",
        content: []
    }
    const handleChange = (isExpanded) => {
        setExpanded(isExpanded ? true: false);
    }
    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }
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
    function handleLikes(event){
        store.addLike();
    }
    function handleDislikes(event){
        store.addDislike();
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
            className={selectClass}
            sx={{borderRadius:"25px", p: "10px", bgcolor: '#8000F00F', marginTop: '15px', display: 'flex', p: 1 }}
            style={{transform:"translate(1%,0%)", width: '100%', fontSize: '12pt' }}
            button
            onDoubleClick={(event) => {
                   handleToggleEdit(event)
            }}
        >
            <Accordion sx={{height: "100%", width: "100%"}} expanded={expanded} onChange={(event, isExpanded) => handleChange(isExpanded, true)} onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }}>
                <AccordionSummary id='panel' expandIcon={<KeyboardDoubleArrowDownIcon/>}>
                    <Box sx ={{display: "flex", alignItems:"flex-start", flexDirection: "column", p: 1, m: 1, borderRadius: 1}}>
                        <Box>
                            <div id="name-playlist">{idNamePair.name}</div></Box>
                        <Box>By: {username}</Box>
                        <Box>{published}</Box>
                    </Box>
                    <Box sx ={{display: "flex", alignItems:"flex-start", flexDirection: "row", p: 1, m: 1, borderRadius: 1}}>
                    <Box sx={{m:2}}>
                        <IconButton onClick={(event) => {
                        handleLikes(event)}}><ThumbUpIcon/></IconButton>
                        <Box></Box>
                    </Box>
                    <Box sx={{m:3}}>
                        <IconButton onClick={(event) => {
                        handleDislikes(event)}}><ThumbDownIcon /></IconButton>
                    </Box>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    
                </AccordionDetails>
            </Accordion>
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