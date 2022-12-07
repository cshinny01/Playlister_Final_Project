import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import Menu from '@mui/material/Menu';
import AppBar from '@mui/material/AppBar';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
export default function AppToolbar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    let disabled = false;
    const handleSearchItem = () => {
        store.sortBySearch();
        disabled=false;
    }
    const handleMenuClose = () => {
        setAnchorEl(null);
    }
    const handleSortMenuOpen= (event) =>{
        setAnchorEl(event.currentTarget);
    }
    const handleClick = () =>{
        disabled=false;
    }
    const menuID = "sort-by-menu"
    const sortMenu = (
        <Menu 
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            id={menuID}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={() => handleSearchItem("Name_a-z")}>Name (A-Z)</MenuItem>
            <MenuItem onClick={() => handleSearchItem("Publish_Date")}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={() => handleSearchItem("Listens")}>Listens (High - Low)</MenuItem>
            <MenuItem onClick={() => handleSearchItem("Publish_Date")}>Likes (High - Low)</MenuItem>
            <MenuItem onClick={() => handleSearchItem("Publish_Date")}>Dislikes (High - Low)</MenuItem>     
        </Menu>
    );
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton sx={{mr:2}} disabled={disabled} onClick={()=>handleClick("/")}>
                        <HomeOutlinedIcon sx = {{fontSize:"45px", float: "right"}}/>
                    </IconButton>
                    <IconButton sx={{mr:2}} disabled={disabled} onClick={()=>handleClick("/")}>
                        <GroupsOutlinedIcon sz= {{fontSize:"45px", float: "right"}}/>
                    </IconButton>
                    <IconButton sx={{mr:2}} disabled={disabled} onClick={()=>handleClick("/")}>
                        <PersonOutlinedIcon />
                    </IconButton>
                    <Box sx={{m:1, width: '75ch', backgroundColor: "white"}} disabled={disabled} noValidate autoComplete="off">
                        <TextField id ="searchbar" label="Search" disabled={disabled} variant="outlined"
                        defaultValue="" onKeyPress={event=> store.enterSearchField(event, "Enter")}
                        onChange={event => store.enterSearchField(event, "Change")}/>
                    </Box>
                    <strong style={{color: "black", position: "relative", right:"-350px", size:"45px"}}>
                        Sort By
                    </strong>
                    <Box sx={{md: "flex", marginLeft: "auto"}}>
                        <IconButton edge="end" aria-controls={menuID}
                        onClick={handleSortMenuOpen}>
                            <SortIcon sx= {{fontSize: "45px", color:"black"}}/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {
               sortMenu
            }
        </Box>
    );
}
