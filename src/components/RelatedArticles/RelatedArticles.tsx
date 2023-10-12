import { Container, Box, Typography } from '@mui/material'
import { Article } from '../../../types'
import ArticlePreview from '../ArticlePreview'

type RelatedArticlesProps = {
  news: Article[],
  title: string,
}

const RelatedArticles = ({news, title}: RelatedArticlesProps) => (<Container>
    <Box pb={5}>
      <Typography sx={{fontSize: '36px', fontWeight: '800'}}>{title}</Typography>
    </Box>
    {news.map(({uuid, published_at: publishedAt, title: newsTitle, source, description, image_url: image}: Article) => (
        <ArticlePreview key={uuid} id={uuid} publishedAt={publishedAt} title={newsTitle} author={source} description={description} urlToImage={image} />
      ))}
  </Container>)

export default RelatedArticles
