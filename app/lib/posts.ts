import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostData = {
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  tags: string[];
  image?: string;
};

export type Post = {
  postData: PostData;
  content: string;
};

export function getSortedPostData(): PostData[] {
  // Read all md files from /posts/*
  const files = fs.readdirSync("posts");
  const posts: PostData[] = files.map((file) => {
    const filePath = `posts/${file}`;
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    const date = new Date(data.date);
    return {
      title: data.title,
      date: date.toISOString(),
      slug: file.replace(/\.md$/, ""),
      excerpt: data.excerpt,
      tags: data.tags || [],
      image: data.image || "",
    };
  });

  // Sort posts by date
  posts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  return posts;
}

/**
 * Returns the slugs from all the posts in the posts directory.
 * @return {string[]} An array of slugs.
 */
export function getPostSlugs(): string[] {
  const postsDir = path.join(process.cwd(), "posts");
  console.log("postsDir", postsDir);
  const files = fs.readdirSync(postsDir);

  return files.map((file) => {
    const filePath = path.join(postsDir, file);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const fileData = matter(fileContents);
    return fileData.data.slug || file.replace(/\.md$/, "");
  });
}
