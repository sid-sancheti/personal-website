// File: app/blog/[slug]/page.tsx
import { getAllPostSlugsInternal, getPostData, Post } from "@/lib/posts"; // Adjust import path if needed
import Link from "next/link";
import { notFound } from "next/navigation";

// Generate static paths for all posts at build time
// This tells Next.js which blog post pages to build ahead of time
export async function generateStaticParams() {
  const slugs = getAllPostSlugsInternal();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Fetch data for a specific post based on the slug
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postData: Post | null = await getPostData(slug);

  // If post data couldn't be fetched (e.g., file not found, parsing error), show 404
  if (!postData) {
    notFound(); // Renders the closest not-found.js page
  }

  return (
    <article style={{ padding: "2rem" }}>
      {" "}
      {/* Basic padding */}
      <h1>{postData.title}</h1>
      <div style={{ color: "#aaa", marginBottom: "1rem" }}>
        {" "}
        {/* Basic date styling */}
        <time dateTime={postData.date}>
          {new Date(postData.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </div>
      <hr style={{ margin: "1rem 0" }} /> {/* Basic separator */}
      {/* Render the HTML content */}
      {/* Apply basic prose styling if @tailwindcss/typography is not used */}
      {/* Consider adding the @tailwindcss/typography plugin for better styling */}
      <div
        style={{ lineHeight: "1.6" }} // Basic readability
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
      <hr style={{ margin: "2rem 0" }} />
      <Link href="/blog">Back to blog list</Link>
      <br />
      <Link href="/">Back to home</Link>
    </article>
  );
}
