import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export interface PostMetadata {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  preview: string;
  [key: string]: any; // Allow for any other frontmatter tags
}

export interface PostData extends PostMetadata {
  content: string;
}

export function getSortedPostsData(): PostMetadata[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md")) // Ensure we only read markdown files
    .map((fileName) => {
      // Remove ".md" from file name to get id (or use slug from frontmatter)
      const id = fileName.replace(/\.md$/, "");

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        title: matterResult.data.title,
        date: matterResult.data.date,
        excerpt: matterResult.data.excerpt,
        preview: matterResult.data.preview,
        slug: matterResult.data.slug || id, // Use frontmatter slug or fallback to filename id
      } as PostMetadata;
    });

  // Sort posts by date
  // TODO: Ensure date format is correct for sorting.
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostData(slug: string): PostData {
  // Find the file corresponding to the slug (could be filename or frontmatter slug)
  const fileNames = fs.readdirSync(postsDirectory);
  const fileName = fileNames.find((name) => {
    const fullPath = path.join(postsDirectory, name);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return (matterResult.data.slug || name.replace(/\.md$/, "")) === slug;
  });

  if (!fileName) {
    // Handle case where slug doesn't match any file appropriately
    // For simplicity, we'll throw an error here, but you might want
    // to return a 404 indicator or default data.
    throw new Error(`Post with slug "${slug}" not found.`);
  }

  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the slug and content
  return {
    title: matterResult.data.title,
    slug: matterResult.data.slug || slug, // Use frontmatter slug or fallback to provided slug
    date: matterResult.data.date,
    excerpt: matterResult.data.excerpt,
    preview: matterResult.data.preview,
    content: matterResult.content, // The actual Markdown content
  };
}
