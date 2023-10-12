import RelatedArticles from '../../components/RelatedArticles';

async function getData() {
  const res = await fetch(`${process.env.SERVER_API_ENDPOINT}/articles`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const news = await getData();

  return (
    <main>
      <RelatedArticles title="Latest U.S. Articles" news={news} />
    </main>
  );
}
