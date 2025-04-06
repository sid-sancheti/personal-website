// pages/blog/index.tsx
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getSortedPostsData, PostMetadata } from '@/lib/posts'; // Adjust path if needed

interface BlogIndexProps {
  allPostsData: PostMetadata[];
}

const BlogIndex: NextPage<BlogIndexProps> = ({ allPostsData }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>My Blog</title>
        <meta name="description" content="List of blog posts" />
      </Head>

      <h1 className="text-4xl font-bold mb-8 text-center">Blog Posts</h1>

      <section className="space-y-6 max-w-2xl mx-auto">
        {allPostsData.map(({ slug, date, title, excerpt }) => (
          <article key={slug} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <h2 className="text-2xl font-semibold mb-2">
              <Link href={`/blog/${slug}`} className="text-blue-600 hover:underline">
                  {title}
              </Link>
            </h2>
            <p className="text-gray-500 mb-2 text-sm">{new Date(date).toLocaleDateString()}</p>
            <p className="text-gray-700">{excerpt}</p>
             <Link href={`/blog/${slug}`} className="text-blue-500 hover:text-blue-700 mt-2 inline-block">
                 Read more &rarr;
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

export default BlogIndex;