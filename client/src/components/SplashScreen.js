import { Link } from 'react-router-dom';
import { useContext } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AuthContext from '../auth';
export default function SplashScreen() {
const {auth} = useContext(AuthContext);

    const handleGuest = () => {
        auth.guestUser();
    }
    return (
        <div id="splash-screen">
            Playlister
            <div id="playlister-description">
                Create, find, and rate other people's playlists! With the only 
                Playlist app you will ever need... Playlister!
            </div>
            <div id="have-account">
                Have an account? Log in!
            </div>
            <Link to='/login'>
                <Button
                    variant="contained"
                    size="medium"
                    sx={{margin:2, top:5}}>Login</Button>
            </Link>
            <div id="dont-have-account">
                Don't have an account? Register now!
            </div>
            <Link to='/register'>
                <Button
                    variant="contained"
                    size="medium"
                    sx={{margin:2, top:5}}>Register an Account!</Button>
            </Link>
            <div id="guest-user">
                Want to explore? Continue as guest!
            </div>
            <Link to='/'>
                <Button
                    variant="contained"
                    size="medium"
                    onClick={handleGuest}
                    sx={{margin:2, top:5}}>Continue as Guest</Button>
            </Link>
        </div>
    )
}