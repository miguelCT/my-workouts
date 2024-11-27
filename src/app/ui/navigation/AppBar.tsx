import HomeIcon from '@mui/icons-material/Home';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { getServerAuthSession } from '@/server/auth';
import AppBackNavigation from './AppBackNavigation';
import SignOutButton from '../auth/SignOutButton';
import SignInButton from '../auth/SignInButton';

export default async function AppBar() {
    const session = await getServerAuthSession();

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
                    <Box
                        sx={{
                            mr: 4,
                        }}
                    >
                        <AppBackNavigation />
                    </Box>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        My workouts
                    </Typography>
                    <div>
                        {session ? (
                            <>
                                {session?.user?.email}
                                <SignOutButton />
                            </>
                        ) : (
                            <SignInButton />
                        )}
                    </div>
                </Toolbar>
            </MuiAppBar>
        </Box>
    );
}
