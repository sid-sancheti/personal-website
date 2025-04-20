import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from 'remark';
import html from 'remark-html';

// Define types for metadata and the full post object
export type PostData = {
  title: string;
  date: string; // Keep as ISO string for consistency
  slug: string;
  excerpt: string;
  tags: string[];
  image: string;
};

export type Post = PostData & {
  contentHtml: string; // Add HTML content
};

// Consistent path to the posts directory
const postsDir = path.join(process.cwd(), "posts");

// Helper function to get slugs safely (used by getSortedPostData)
// Use matter and fetch the slug from the frontmatter
export function getAllPostSlugsInternal(): string[] {
  try {
    // Ensure the directory exists before reading
    if (!fs.existsSync(postsDir)) {
        console.warn(`Posts directory not found: ${postsDir}`);
        return [];
    }
    const fileNames = fs.readdirSync(postsDir);
    // Filter for markdown files only
    return fileNames.filter(fileName => fileName.endsWith('.md')).map(fileName => {
      const fileData = matter.read(path.join(postsDir, fileName));

       // Use slug from frontmatter or fallback to filename
      return fileData.data.slug || fileName.replace(/\.md$/, "");
    });
  } catch (error) {
    console.error("Error reading posts directory:", postsDir, error);
    return []; // Return empty array on error
  }
}

export function getSortedPostData(): PostData[] {
  const slugs = getAllPostSlugsInternal();
  const posts: PostData[] = slugs.map((slug) => {
    const filePath = path.join(postsDir, `${slug}.md`);
    try {
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents); // Only need metadata here

      // Basic validation
      if (!data.title || !data.date || !data.excerpt) {
        console.warn(`Post "${slug}.md" is missing required front matter (title, date, excerpt). Skipping.`);
        return null; // Indicate failure to process this post
      }

      const date = new Date(data.date);
      // Check if date is valid
      if (isNaN(date.getTime())) {
          console.warn(`Post "${slug}.md" has an invalid date: ${data.date}. Skipping.`);
          return null;
      }

      return {
        title: data.title,
        date: date.toISOString(),
        slug: slug, // Use the filename-derived slug
        excerpt: data.excerpt,
        tags: data.tags || [],
        image: data.image || "",
      };
    } catch (error) {
      console.error(`Error reading or parsing post "${slug}.md":`, error);
      return null; // Indicate failure
    }
  }).filter((post): post is PostData => post !== null); // Filter out nulls (posts that failed)

  // Sort posts by date (newest first)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

/**
 * Returns the data and HTML content for a single post.
 * @param {string} slug - The slug of the post to retrieve.
 * @returns {Promise<Post | null>} The post data and HTML content, or null if not found/error.
 */
export async function getPostData(slug: string): Promise<Post | null> {
  const filePath = path.join(postsDir, `${slug}.md`);
  try {
    if (!fs.existsSync(filePath)) {
        console.error(`Post file not found for slug "${slug}": ${filePath}`);
        return null;
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents); // Get both data and markdown content

    // Basic validation
    if (!data.title || !data.date || !data.excerpt) {
      console.warn(`Post "${slug}.md" is missing required front matter (title, date, excerpt).`);
      // Return null if essential data is missing
      return null;
    }

    const date = new Date(data.date);
    // Check if date is valid
    if (isNaN(date.getTime())) {
        console.warn(`Post "${slug}.md" has an invalid date: ${data.date}.`);
        return null;
    }

    // Process markdown content to HTML
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      contentHtml,
      title: data.title,
      date: date.toISOString(),
      excerpt: data.excerpt,
      tags: data.tags || [],
      image: data.image || "",
    };
  } catch (error) {
      console.error(`Error reading, parsing, or processing post "${slug}.md":`, error);
      return null; // Indicate failure
  }
}