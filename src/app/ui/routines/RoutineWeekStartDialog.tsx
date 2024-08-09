'use client';

import { Box, Button, DialogContent, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, type PropsWithChildren } from 'react';

import AddIcon from '@mui/icons-material/AddOutlined';
import CloseIcon from '@mui/icons-material/Close';

export interface RoutineWeekStartDialogProps {
    onClose?: () => void;
}

function RoutineWeekStartDialog(
    props: PropsWithChildren<RoutineWeekStartDialogProps>,
) {
    const [open, setOpen] = useState(false);
    const { children } = props;

    return (
        <>
            <Button
                color="primary"
                variant="outlined"
                onClick={() => setOpen(true)}
            >
                <AddIcon />
            </Button>
            <Dialog onClose={() => setOpen(false)} open={open}>
                <DialogTitle>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <span>Start the week</span>
                        <IconButton onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>{children}</DialogContent>
            </Dialog>
        </>
    );
}

export default RoutineWeekStartDialog;
