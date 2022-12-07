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
    const [disable, setDisabled] = useState(false);
    const isMenuOpen = Boolean(anchorEl);
    const handleSortTypeClick = (sortType) => {
        store.setSort(sortType);
        setAnchorEl(null);
    }
    const handleMenuClose = () => {
        setAnchorEl(null);
    }
    const handleSortMenuOpen = (event) =>{
        setAnchorEl(event.currentTarget);
    }
    const handleClick = () =>{
        setDisabled(false);
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
            <MenuItem onClick={(event) => handleSortTypeClick(event, "name")}>Name (A-Z)</MenuItem>
            <MenuItem onClick={(event) => handleSortTypeClick(event, "newest")}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={(event) => handleSortTypeClick(event, "listens")}>Listens (High - Low)</MenuItem>
            <MenuItem onClick={(event) => handleSortTypeClick(event, "likes")}>Likes (High - Low)</MenuItem>
            <MenuItem onClick={(event) => handleSortTypeClick(event, "dislikes")}>Dislikes (High - Low)</MenuItem>     
        </Menu>
    );
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton sx={{mr:2}} disable onClick={()=>handleClick("/")}>
                        <HomeOutlinedIcon sx = {{fontSize:"45px", float: "right"}}/>
                    </IconButton>
                    <IconButton sx={{mr:2}} disable onClick={()=>handleClick("/")}>
                        <GroupsOutlinedIcon sz= {{fontSize:"45px", float: "right"}}/>
                    </IconButton>
                    <IconButton sx={{mr:2}} disable onClick={()=>handleClick("/")}>
                        <PersonOutlinedIcon />
                    </IconButton>
                    <Box sx={{m:1, width: '20%', backgroundColor: "white"}} disable noValidate autoComplete="off">
                        <TextField id ="searchbar" label="Search" disable variant="outlined"
                        defaultValue="" width="90%" onKeyPress={event=> store.enterSearchField(event, "Enter")}
                        onChange={event => store.enterSearchField(event, "Change")}/>
                    </Box>
                    <strong style={{color: "black", position: "relative", right: "-250px", size:"45px"}}>
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
