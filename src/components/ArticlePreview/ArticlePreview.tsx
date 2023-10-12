import {
  Card,
  CardMedia,
  CardActionArea,
  CardHeader,
  CardContent,
  Typography,
} from '@mui/material';

type ArticlePreviewProps = {
  id: string;
  publishedAt: string;
  author: string;
  title: string;
  urlToImage: string;
  description: string;
};

const ArticlePreview = ({
  id,
  publishedAt,
  author,
  title,
  urlToImage,
  description,
}: ArticlePreviewProps) => (
    <Card
      sx={{
        boxShadow: 3,
        mb: '10px',
      }}
    >
      <CardActionArea href={`/resource/${id}`}>
        <CardHeader
          title={
            <Typography sx={{ fontSize: '26px', fontWeight: '600' }}>
              {title}
            </Typography>
          }
          subheader={`${author}: ${new Date(publishedAt || '').toLocaleString(
            'en-US',
            {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }
          )}`}
        />
        <CardMedia
          component="img"
          height="194"
          image={urlToImage}
          alt={description}
        />
        <CardContent>
          <Typography>{description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );

export default ArticlePreview;
