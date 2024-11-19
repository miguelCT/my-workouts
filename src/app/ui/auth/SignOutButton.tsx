'use client';

import { Button } from '@mui/material';
import { signOut } from 'next-auth/react';

export default function SignOutButton() {
    return (
        <form
            action={async () => {
                await signOut();
            }}
        >
            <Button
                type="submit"
                variant="contained"
                color="inherit"
                size="small"
            >
                Sign out
            </Button>
        </form>
    );
}
