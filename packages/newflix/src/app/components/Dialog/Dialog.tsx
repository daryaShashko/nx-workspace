import * as React from 'react';
import Button from '@mui/material/Button';
import MUIDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useImperativeHandle } from 'react';

export type DialogProps = {
    description: string;
    title: string;
    onClose?: () => void;
    onOpen?: () => void;
    onAgree?: () => void;
    onDisagree?: () => void;
};

export type DialogImperativeHandlersProps = { openDialog: () => void; closeDialog: () => void };

export const Dialog = React.forwardRef<DialogImperativeHandlersProps, DialogProps>(
    ({ title, description, onClose, onAgree, onOpen, onDisagree }, ref) => {
        const [open, setOpen] = React.useState(false);

        useImperativeHandle(ref, () => ({
            openDialog() {
                setOpen(true);
            },
            closeDialog() {
                setOpen(false);
            }
        }));

        const handleClickOpen = () => {
            setOpen(true);
            onOpen?.();
        };

        const handleClose = () => {
            setOpen(false);
            onClose?.();
        };

        const handleAgree = () => {
            onAgree?.();
            handleClose();
        };

        const handleDisagree = () => {
            onDisagree?.();
            handleClose();
        };

        return (
            <div>
                <MUIDialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDisagree}>Disagree</Button>
                        <Button onClick={handleAgree} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </MUIDialog>
            </div>
        );
    }
);
