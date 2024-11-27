import { type NextPage } from 'next';
import { redirect } from 'next/navigation';
import { getServerAuthSession } from '@/server/auth';
import SignInButton from '@/app/ui/auth/SignInButton';
import { Box, Container, Typography, Card, CardContent } from '@mui/material';

const Page: NextPage = async () => {
    const session = await getServerAuthSession();

    if (session) {
        redirect('/');
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Card
                    variant="outlined"
                    sx={{ width: '100%', maxWidth: 400, boxShadow: 'none' }}
                >
                    <CardContent>
                        <Typography
                            component="h1"
                            variant="h5"
                            align="center"
                            gutterBottom
                            color="primary"
                        >
                            Welcome Back
                        </Typography>
                        <Typography
                            variant="body2"
                            align="center"
                            color="textSecondary"
                            paragraph
                        >
                            Please sign in to access your account
                        </Typography>
                        <Box
                            sx={{
                                mt: 2,
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <SignInButton />
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default Page;
