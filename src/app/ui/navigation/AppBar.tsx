import HomeIcon from '@mui/icons-material/Home';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import AppBackNavigation from './AppBackNavigation';

export default function AppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <MuiAppBar
                elevation={0}
                position="fixed"
                color="primary"
                sx={{ top: 'auto', bottom: 0 }}
            >
                <Toolbar>
                    <IconButton
                        LinkComponent={Link}
                        href="/routines"
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <HomeIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        My workouts
                    </Typography>
                    <AppBackNavigation />
                </Toolbar>
            </MuiAppBar>
        </Box>
    );
}
