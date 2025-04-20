// File: app/blog/page.tsx
import Link from 'next/link';
import { getSortedPostData, PostData } from '@/lib/posts'; // Adjust import path if needed

export default function BlogIndex() {
  // Fetch data directly in the Server Component
  const allPostsData: PostData[] = getSortedPostData();

  return (
    <section style={{ padding: '2rem' }}> {/* Basic padding */}
      <h2>Blog</h2>
      {allPostsData.length === 0 ? (
        <p>No blog posts found. Ensure markdown files exist in the 'posts' directory and have correct front matter (title, date, excerpt).</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}> {/* Remove list bullets */}
          {allPostsData.map(({ slug, date, title, excerpt }) => (
            <li key={slug} style={{ marginBottom: '1.5rem' }}> {/* Basic spacing */}
              <Link href={`/blog/${slug}`} style={{ textDecoration: 'none', color: 'inherit' }}> {/* Basic link styling */}
                <h3 style={{ marginBottom: '0.25rem' }}>{title}</h3>
              </Link>
              <small>
                {/* Format date nicely */}
                <time dateTime={date}>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              </small>
              <p style={{ marginTop: '0.5rem' }}>{excerpt}</p>
            </li>
          ))}
        </ul>
      )}
      <br />
      <Link href="/">Back to home</Link>
    </section>
  );
}

// Optional: Add metadata for the blog index page
export const metadata = {
  title: 'My Blog',
  description: 'A collection of posts about various topics.',
};