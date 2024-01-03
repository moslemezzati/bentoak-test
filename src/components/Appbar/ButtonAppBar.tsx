import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useUser, useUserDispatch} from "../../contexts/userContext.tsx";
import {useNavigate} from "react-router-dom";

export default function ButtonAppBar() {
    const user = useUser()
    const dispatch = useUserDispatch();
    const navigate = useNavigate();
    if(!user.email){
        navigate('/auth/login')
    }
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Welcome {`${user.firstName} ${user.lastName}`}
                    </Typography>
                    <Button onClick={() => {
                        dispatch({type: 'logout'});
                        localStorage.setItem('user', '');
                        navigate('/auth/login')
                    }} color="error">Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}