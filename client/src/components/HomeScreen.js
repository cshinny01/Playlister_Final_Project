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
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);
    const handleCreateNewList = (event) => {
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
        <Grid container spacing={2}>
            <Grid item xs={6} md={5}>
                <div id="playlist-selector">
                    <div id="list-selector-heading">
                    </div>
                <Box sx={{bgcolor:"background.paper"}} id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
                <Grid item xs={6} md={5}>
                    <YouTube sx={{position: "fixed", top: 0, right: 0, zIndex: 2000}} id="video-player"></YouTube>
                </Grid>
                
                <Box sx={{bgcolor: "background.paper", bottom: 0, left: "50%", position: "relative", position: "sticky"}}>
                    <Fab sx={{transform:"translate(-20%, 0%)", bottom: "10%", left: "40%", position: "relative", position: "sticky"}}
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
            </Grid>
            
               
        </Grid>)
}

export default HomeScreen;