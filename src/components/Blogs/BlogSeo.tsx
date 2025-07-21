function BlogSeo({
  title,
  description,
  keywords,
}: {
  title: string;
  description: string;
  keywords: string;
}) {
  return (
    <article>
      <title>{`${title} | LifeRank`}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </article>
  );
}

export default BlogSeo;
