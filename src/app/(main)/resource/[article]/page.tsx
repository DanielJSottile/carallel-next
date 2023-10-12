import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { Article , CustomSession, Link } from '../../../../../types';
import FullArticle from '../../../../components/FullArticle';
import { authOptions } from '../../../api/auth/[...nextauth]/route';

export async function generateStaticParams() {
  const res = await fetch(`${process.env.SERVER_API_ENDPOINT}/articles`, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': `${process.env.NEXT_PUBLIC_APP_API_KEY}`
    }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data KK');
  }

  const news = await res.json();

  return news.map((article: Article) => ({
    article: article.uuid,
  }));
}

async function fetchArticle(id: string, accessToken: string) {
  try {
    const res = await fetch(`http://localhost:8080/articles/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-API-KEY': `${process.env.NEXT_PUBLIC_APP_API_KEY}`,
      },
    });

    if (!res.ok) {
      throw new Error(
        'Failed to fetch article id, you probably ran out of daily API fetches'
      );
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching article:', error);
    throw error;
  }
}

async function fetchRelatedArticles(id: string, accessToken: string) {
  try {
    const res = await fetch(`http://localhost:8080/articles/related/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-API-KEY': `${process.env.NEXT_PUBLIC_APP_API_KEY}`
      },
    });

    if (!res.ok) {
      throw new Error(
        'Failed to fetch related articles, you probably ran out of daily API fetches'
      );
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching related articles:', error);
    throw error;
  }
}

async function fetchUserLinks(userId: string, accessToken: string) {
  try {
    const res = await fetch(`http://localhost:8080/links/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-API-KEY': `${process.env.NEXT_PUBLIC_APP_API_KEY}`
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch links');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching user links:', error);
    throw error;
  }
}

async function addUserLink(userId: string, id: string, accessToken: string) {
  try {
    await fetch('http://localhost:8080/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-API-KEY': `${process.env.NEXT_PUBLIC_APP_API_KEY}`
      },
      body: JSON.stringify({
        url: id,
        user_id: userId,
      }),
    });
  } catch (error) {
    console.error('Error adding user link:', error);
    throw error;
  }
}

export default async function Resource({
  params,
}: {
  params: { article: string };
}) {
  /** data fetching section */
  const session = (await getServerSession(authOptions)) as CustomSession;

  if (!session?.accessToken) {
    redirect(`/login?callbackUrl=/resource/${params.article}`);
  }

  const {
    uuid,
    published_at: publishedAt,
    title,
    source,
    description,
    image_url: image,
  } = await fetchArticle(params.article, session?.accessToken);
  const news = await fetchRelatedArticles(params.article, session?.accessToken);
  const userLinks = await fetchUserLinks(
    session?.user.id,
    session?.accessToken
  );
  if (!userLinks.find((link: Link) => link.url === params.article)) {
    await addUserLink(session?.user.id, params.article, session?.accessToken);
  }

  return (
    <FullArticle
      publishedAt={publishedAt}
      title={title}
      author={source}
      description={description}
      urlToImage={image}
      news={news}
    />
  );
}
