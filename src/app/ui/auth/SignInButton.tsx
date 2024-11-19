'use client';

import { Button } from '@mui/material';
import { signIn } from 'next-auth/react';

export default function SignInButton() {
    return (
        <form
            action={async () => {
                await signIn();
            }}
        >
            <Button
                type="submit"
                variant="contained"
                color="inherit"
                size="small"
            >
                Sign in
            </Button>
        </form>
    );
}
