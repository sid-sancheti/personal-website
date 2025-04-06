// pages/blog/[slug].tsx
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring'; // For typing params
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
import remarkGfm from 'remark-gfm'; // Import remarkGfm
import rehypeRaw from 'rehype-raw'; // Import rehypeRaw
// You might need to import highlight.js CSS in your _app.tsx or here
// import 'highlight.js/styles/github.css'; // Example stylesheet

import { getAllPostSlugs, getPostData, PostData } from '@/lib/posts'; // Adjust path

// Define the expected URL params interface
interface IParams extends ParsedUrlQuery {
  slug: string;
}

// Define the props for the Post component
interface PostProps {
  postData: PostData;
}

const Post: NextPage<PostProps> = ({ postData }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>{postData.title}</title>
        <meta name="description" content={postData.excerpt} />
      </Head>

      <article className="max-w-3xl mx-auto">
        <header className="mb-8 border-b pb-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{postData.title}</h1>
          <p className="text-gray-500 text-sm">
            By {postData.author} on {new Date(postData.date).toLocaleDateString()}
          </p>
        </header>

        {/* Apply Tailwind Typography styles here */}
        <div className="prose lg:prose-xl max-w-none">
          <ReactMarkdown
              remarkPlugins={[remarkGfm]} // Enable GitHub Flavored Markdown
              rehypePlugins={[
                  rehypeRaw, // Allow HTML rendering
              ]}
              // You can add custom components here if needed
              // components={{
              //   h2: ({node, ...props}) => <h2 className="text-red-500" {...props} />,
              // }}
          >
            {postData.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false, // Means other routes should 404 if not pre-built
    // fallback: 'blocking' // Or true if you want ISR/SSR for non-pre-built paths
  };
};

export const getStaticProps: GetStaticProps<PostProps, IParams> = async (context) => {
  const { slug } = context.params!; // Non-null assertion because fallback: false
  const postData = getPostData(slug);
  return {
    props: {
      postData,
    },
  };
};

export default Post;