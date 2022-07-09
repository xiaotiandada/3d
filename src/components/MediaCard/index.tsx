import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

interface MediaCardProps {
  link: string;
  image: string;
  title: string;
  description: string;
}

const MediaCard: FC<MediaCardProps> = ({ link, image, title, description }) => {
  return (
    <Link href={link} target="_blank">
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            image={image}
            alt="green iguana"
          />
          <CardContent style={{ textAlign: 'left' }}>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default MediaCard;
