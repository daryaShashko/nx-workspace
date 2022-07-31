import * as React from 'react';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FilmItemProps } from './types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { grey } from '@mui/material/colors';
import { Dialog } from '../Dialog';
import { DialogImperativeHandlersProps } from '../Dialog/Dialog';

export const FilmItem: React.FC<FilmItemProps> = ({ img, title, genre, date, onClick, onEdit, onDelete }) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Card sx={{ position: 'relative' }} onClick={onClick}>
            <IconButton
                aria-label="settings"
                aria-describedby={id}
                onClick={handleClick}
                sx={{ position: 'absolute', right: 0 }}>
                <MoreVertIcon />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}>
                <List sx={{ width: 200, maxWidth: 360, bgcolor: grey[50] }} aria-label="film-dialog">
                    <ListItem disablePadding>
                        <ListItemButton onClick={onDelete}>
                            <ListItemIcon>
                                <DeleteIcon />
                            </ListItemIcon>
                            <ListItemText primary="Delete" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={onEdit}>
                            <ListItemIcon>
                                <EditIcon />
                            </ListItemIcon>
                            <ListItemText primary="Edit" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Popover>
            <CardMedia
                component="img"
                image={
                    img ||
                    'https://us.123rf.com/450wm/urfandadashov/urfandadashov1809/urfandadashov180901275/109135379-photo-not-available-vector-icon-isolated-on-transparent-background-photo-not-available-logo-concept.jpg?ver=6'
                }
                alt={`${title} image`}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {genre.join(', ')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {date.toDateString()}
                </Typography>
            </CardContent>
        </Card>
    );
};
