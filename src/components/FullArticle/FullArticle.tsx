import {
  Container,
  Box,
  Typography,
} from '@mui/material';
import RelatedArticles from '../RelatedArticles';
import { lorumIpsum } from '../../utils/constants';
import { Article } from '../../../types';

type ArticleProps = {
  id: string;
  publishedAt: string;
  author: string;
  title: string;
  urlToImage: string;
  description: string;
  news: Article[];
};

const FullArticle = ({
  id,
  publishedAt,
  author,
  title,
  urlToImage,
  description,
  news,
}: ArticleProps) => {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundImage: `linear-gradient(45deg, 
              rgba(245,70,66, 0.75), 
              rgba(8,83,156, 0.75)), url(${urlToImage})`,
          height: '400px',
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Box position="relative" height='90%'>
          <Typography
            sx={{ 
              padding: '1rem',
              color: "white",
              margin: "auto",
              fontSize: {xs:"30px", md: '50px'},
              fontWeight: "600",
              textAlign: "center",
              textShadow: 'black 1px 2px;' }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              position: 'absolute',
              bottom: '80px',
              fontStyle: 'italic',
              ml: '10px',
              fontSize: {xs: '1rem', md: '20px'},
              color: 'white',
              textShadow: 'black 1px 2px;',
            }}
          >
            {description}
          </Typography>
          <Typography
            sx={{
              position: 'absolute',
              bottom: '20px',
              ml: '10px',
              fontSize: {xs: '1rem', md: '20px'},
              fontWeight: '400',
              color: 'white',
              textShadow: 'black 1px 2px;',
            }}
          >
            {new Date(publishedAt).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              timeZoneName: 'short',
            })}
          </Typography>
          <Typography
            sx={{
              position: 'absolute',
              bottom: '-10px',
              ml: '10px',
              fontSize: {xs: '1rem', md: '20px'},
              fontWeight: '400',
              color: 'white',
              textShadow: 'black 1px 2px;',
            }}
          >{`By: ${author}`}</Typography>
        </Box>
      </Box>
      <Typography my='40px' fontSize='1.125rem' fontFamily={'PT Serif'} lineHeight={1.75} sx={{whiteSpace: "pre-wrap"}}>{lorumIpsum}</Typography>
      <RelatedArticles title="Related Articles" news={news} />
    </Container>
  );
};

export default FullArticle;
