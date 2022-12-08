import React, { useContext, useEffect, useState  } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import Grid from '@mui/material/Grid';
import ReactPlayer from 'react-player'
import AddIcon from '@mui/icons-material/Add';
import { TextField } from '@mui/material';
import YouTube from 'react-youtube';
import { positions } from '@mui/system'
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import Tab from '@mui/material/Tab';
import FastForwardIcon from '@mui/icons-material/FastForward';
import IconButton from '@mui/material/IconButton';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AppBanner from './AppBanner.js';
import AppToolbar from './AppToolbar.js';
import App from '../App';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const {playlist, setPlaylist} = useState([]);
    const [playing, setPlaying] = useState(true);
    let playlistName = "";
    let num = "";
    let song = "";
    let artist = "";
    let currentSong = 0;
    useEffect(() => {
        store.loadIdNamePairs();
    }, []);
    let disabled=false;
    const[tabIndex, setTabIndex] = useState(0);
    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    }
    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST

    
    function handlePostingComment() {

    }
    
    const handleCreateNewList = (event) => {
        event.stopPropagation();
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{overflow: "scroll", width: '50%', bgcolor: 'background.paper', mb:"15px" }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                        
                    />
                ))
            }
            </List>;
    }
    return (
            <div id="playlist-selector">
                <div id="list-selector-heading">
                </div>
            <Box sx={{bgcolor:"background.paper"}} id="list-selector-list">
            {
                listCard
                
            }
            <MUIDeleteModal />
            <Box>
                <Tabs value={tabIndex} onChange={handleTabChange} id = "tabs-for-video">
                    <Tab label="Player"/>
                    <Tab label="Comments"/>
                </Tabs>
            </Box>
            <Box>
                {tabIndex === 0 && (
                    <Box>
                        <ReactPlayer playing ={playing} sx={{position: "fixed", top: 0, right: 0, zIndex: 2000, width: "50%"}} url= "https://www.youtube.com/watch?v=dQw4w9WgXcQ" id="video-player"/>
                    <Box sx = {{bgcolor: "white"}} id = "song-info">
                    <div id = "Now-playing-field">
                        <div id="Now-playing-text">
                              Now Playing:
                        </div>
                        <div id="Playlist-name">
                            Playlist: {playlistName}
                        </div>
                        <div id="Song-number">
                            Song number: {num}
                        </div>
                        <div id="song-title">
                            Song title: {song}
                        </div>
                        <div id="artist-of-song">
                            Artist: {artist}
                        </div>
                        <Box sx = {{display: "flex", justifyContent: "center", flexDirection: "row", p: 1, m: 1, borderRadius: 1, bgcolor: "orange"}}>
                            <Box>
                                <IconButton><FastRewindIcon/></IconButton>
                            </Box>
                            <Box>
                                <IconButton onClick={() => setPlaying(false)}><StopIcon/></IconButton>
                            </Box>
                            <Box>
                                <IconButton onClick={() => setPlaying(true)}><PlayArrowIcon/></IconButton>
                            </Box>
                            <Box>
                                <IconButton ><FastForwardIcon/></IconButton>
                            </Box>
                        </Box>
                    </div>
                    </Box>
                </Box>
                    
                )}
                {tabIndex === 1 && (
                    <Box id="comment-section" overflow="auto">
                        Comment Section
                        <TextField id="type-in-comment" label="Please enter a comment" variant="outlined" disabled={disabled} onKeyPress={handlePostingComment} width="30px" top="100%"/>
                    </Box>
                )}
            </Box>
            
            
            <Box sx={{bgcolor: "background.paper", bottom: 0, left: "50%", position: "absolute"}}>
                <Fab sx={{transform:"translate(-20%, 0%)", bottom: "10%", left:"-50%", position: "absolute"}}
                    color="blue" 
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                >
                    <AddIcon />
                </Fab>
                <div id="your-list-text">
                    Your lists
                </div>
            </Box>
            </Box>
            </div>
        )
}

export default HomeScreen;