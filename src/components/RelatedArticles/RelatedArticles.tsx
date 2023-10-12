import { Container, Box, Typography } from "@mui/material"
import ArticlePreview from "../ArticlePreview"
import { Article } from "../../../types"

type RelatedArticlesProps = {
  news: Article[],
  title: string,
}

const RelatedArticles = ({news, title}: RelatedArticlesProps) => {
  return (<Container>
    <Box pb={5}>
      <Typography sx={{fontSize: '36px', fontWeight: '800'}}>{title}</Typography>
    </Box>
    {news.map(({uuid, published_at: publishedAt, title, source, description, image_url: image}: Article) => {
      return (
        <ArticlePreview key={uuid} id={uuid} publishedAt={publishedAt} title={title} author={source} description={description} urlToImage={image} />
      )
    })}
  </Container>)
}

export default RelatedArticles
