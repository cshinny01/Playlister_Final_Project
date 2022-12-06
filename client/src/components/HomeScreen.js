import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
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
import WorkspaceScreen from './WorkspaceScreen';
import AppBar from '@mui/material/AppBar';
import YouTubePlayerExample from './YoutubePlaylisterReact.js';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    let playlistName = "";
    let num = "";
    let song = "";
    let artist = "";
    useEffect(() => {
        store.loadIdNamePairs();
    }, []);
    let playlist = [
        
    ];

    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    let currentSong = 0;

    const playerOptions = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };
    function loadAndPlayCurrentSong(player) {
        let song = playlist[currentSong];
        player.loadVideoById(song);
        player.playVideo();
    }
    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        currentSong++;
        currentSong = currentSong % playlist.length;
    }
    function decSong() {
        if (currentSong != 0){
            currentSong--;
            currentSong = currentSong % playlist.length;
        }
        else{
            console.log("At beginning of playlist");
        }
    }
    function onPlayerReady(event) {
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }
    const handleCreateNewList = (event) => {
        store.createNewList();
    }
    const handleGoPreviousSong = (event) => {
        decSong();
        
    }
    const handleStopVideo = (event) => {

    }
    const handleCommentOpen = (event)=>{

    }
    const handlePlayVideo = (event) => {
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
    }
    const handleGoNextSong = (event) => {
        incSong();
        event.target.playVideo();
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
            <Tabs
                aria-label="player-comments"
                id="tabs-for-video"
            >
                <Tab value="player" label="Player" />
                <Tab value="comments" label="Comments" onClick={handleCommentOpen}/>
            </Tabs>
            <YouTube sx={{position: "fixed", top: 0, right: 0, zIndex: 2000}} id="video-player"
            videoId={playlist[currentSong]}
            opts={playerOptions}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange}></YouTube>
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
                            <IconButton onClick={handleGoPreviousSong}><FastRewindIcon/></IconButton>
                        </Box>
                        <Box>
                            <IconButton onClick={handleStopVideo}><StopIcon/></IconButton>
                        </Box>
                        <Box>
                            <IconButton onClick={handlePlayVideo}><PlayArrowIcon/></IconButton>
                        </Box>
                        <Box>
                            <IconButton onClick={handleGoNextSong}><FastForwardIcon/></IconButton>
                        </Box>
                    </Box>
                </div>
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