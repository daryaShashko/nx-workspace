import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import { FilmDescriptionProps } from './type';

export const FilmDescription: React.FC<FilmDescriptionProps> = ({
    id,
    img,
    title,
    date,
    genre,
    duration,
    description,
    rate: number
}) => {
    return (
        <Card id={id} sx={{ position: 'relative' }}>
            <Stack spacing={2} direction={'row'} style={{ maxHeight: 250 }}>
                <CardMedia
                    component="img"
                    image={
                        img ||
                        'https://us.123rf.com/450wm/urfandadashov/urfandadashov1809/urfandadashov180901275/109135379-photo-not-available-vector-icon-isolated-on-transparent-background-photo-not-available-logo-concept.jpg?ver=6'
                    }
                    alt={`${title} image`}
                />
                <CardContent>
                    <Typography variant="h3" gutterBottom component="div">
                        {title}
                    </Typography>
                    <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                    <Typography variant="body2" color="text.secondary">
                        {genre}
                    </Typography>
                    <Stack spacing={2} direction={'row'}>
                        <Typography variant="body2" color="text.secondary">
                            {date.toDateString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {duration}
                        </Typography>
                    </Stack>
                    <Typography variant="body2" gutterBottom>
                        {description}
                    </Typography>
                </CardContent>
            </Stack>
        </Card>
    );
};
