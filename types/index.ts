export type Article = {
  uuid: string;
  title: string;
  description: string;
  keywords: string;
  snippet: string;
  url: string;
  image_url: string;
  language: string;
  published_at: string;
  source: string;
  categories: string[];
  relevance_score: number | null;
};

export type CustomSession = {
  accessToken: string;
  user: {
    id: string;
    username: string;
    email: string;
    linksVisited: string[];
    name?: string | null | undefined;
    image?: string | null | undefined;
  };
  expires: string;
};
