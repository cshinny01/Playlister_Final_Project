import { useContext, useEffect, useState } from 'react'
import AuthContext from '../auth';
import { useHistory } from 'react-router-dom'
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
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import {Accordion, AccordionSummary, AccordionDetails, Typography} from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import WorkspaceScreen from './WorkspaceScreen';
import Statusbar from './Statusbar';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';


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
    const [isPublished, setPublished] = useState(false);
    const { idNamePair, selected, songs } = props;
    const [ expanded, setExpanded ] = useState(false);
    store.history = useHistory()

    useEffect(() => {
        if(store?.currentList){
            if(store.currentList._id === idNamePair._id){
                console.log("Expanded card is same as currentList")

            }
            
        }
    }, [store?.currentList])
    let playlistSongs = "";
    function handleExpand(event){
        event.stopPropagation();
        setExpanded(true);
        store.getListById(idNamePair._id);
        console.log("Expanded");
    }
    function handleCollaspe(event){
        event.stopPropagation();
        setExpanded(false);
        store.closeCurrentList();
        console.log("not expanded");
    }
    let likes = 0;
    let dislikes = 0;
    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }
    function handleAddSong(event) {
        event.stopPropagation();
        store.addNewSong();
    }
    function handleToggleEdit(event) {
        if (expanded === false){
            event.stopPropagation();
            toggleEdit();
        }
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
    function handleLikes(event, id){
        event.stopPropagation();
        store.addLikes(id);
    }
    function handleDislikes(event, id){
        event.stopPropagation();
        store.addDislikes(id);
    }
    function handleUndo(event){
        event.stopPropagation();
        store.undo();
    }
    function handleRedo(event){
        event.stopPropagation();
        store.redo();
    }
    let published = "";
    function handlePublishList(id){
        store.publishList(id);
    }
    function handleKeyPress(event) {
        event.stopPropagation();
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        event.stopPropagation();
        setText(event.target.value);
    }
    function handleDuplicateList(id){
        store.duplicateList(id);
    }
    let pub = "";
    if (store?.currentList?.published){
        pub =
        <>
        <strong style={{fontSize:"9pt"}}>{published}</strong>
        <IconButton sx = {{position: "absolute", top: "0%", left: "45%"}} onClick={(event) => handleLikes(event, idNamePair._id)}><ThumbUpIcon/> {likes}</IconButton>
        <IconButton sx ={{position: "absolute", top: "0%", left: "65%"}} onClick={(event) => handleDislikes(event, idNamePair._id)}><ThumbDownIcon/>{dislikes}</IconButton>
    </>;
    }
    if (store?.currentList?._id === idNamePair._id){
        console.log("Current list is equal to this list card")

        playlistSongs= <List sx ={{height:"100%", overflow: "auto", width: "auto"}}>
            {
                store.currentList.songs?.map((song, index) => (
                    
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
                ))  
            }
            {!store.currentList.published ?
                <>
                <Button sx={{p:1, width:"100%", justifyContent: "flex-center"}} onClick={(event) => {handleAddSong(event)}}>
                <AddIcon />
                </Button>
                </> :
                <></>
                }
            
            {store.currentList.published?

                <>  
                
                <IconButton sx = {{p:1}} onClick={(event) =>handleDeleteList(event, idNamePair._id)}>Delete</IconButton>
                <IconButton sx ={{p:1}} onClick={(event) => handleDuplicateList(event, idNamePair._id)}>Duplicate</IconButton>
                </> :
                <>
                <IconButton sx = {{p:1}} onClick={(event) => handleUndo(event)}>Undo</IconButton>
                <IconButton sx = {{p:1}} onClick={(event) => handleRedo(event)}>Redo</IconButton>
                <IconButton sx ={{p:1}} onClick={() => handlePublishList(idNamePair._id)}>Publish</IconButton>
                <IconButton sx = {{p:1}} onClick={(event) =>handleDeleteList(event, idNamePair._id)}>Delete</IconButton>
                <IconButton sx ={{p:1}} onClick={(event) => handleDuplicateList(event, idNamePair._id)}>Duplicate</IconButton>
                { modalJSX }
                </>
            }
            
        </List>
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
    let hello = ""; 

    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{borderRadius:"0", p: "10px", bgcolor: '#8000F00F', marginTop: '15px', p: 1 }}
            style={{transform:"translate(1%,0%)", width: '100%', fontSize: '12pt' }}
            button
            onDoubleClick={(event) => {
                   handleToggleEdit(event)
            }}
        >
            <div className = "playlist-card">
                <div>
                    <strong style={{fontSize: "13pt"}}>{idNamePair.name}</strong><br/>
                    <strong style={{fontSize:"9pt"}}>By: {username}</strong>
                    {/* {expanded ?
                        <div className="songs-list">{playlistSongs}
                        </div> :
                        <div className="songs-list">{playlistSongs}
                        </div>} */}
                        {playlistSongs}
                        
                </div>
                <div>
                    {pub
                    }
                </div>
                <div>
                {!expanded ?
                    <>
                    <IconButton sx = {{position:"absolute", top:"0%", right: "0%"}} onClick={(event) =>handleExpand(event)}><KeyboardDoubleArrowDownIcon/></IconButton>
                </> :
                    <>
                    <IconButton sx = {{position:"absolute", top: "0%", right: "0%"}}onClick={(event) => handleCollaspe(event)}><KeyboardDoubleArrowUpIcon/></IconButton>
                    </>   
                }
                </div>    
            </div>
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