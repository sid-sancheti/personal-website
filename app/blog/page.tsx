// File: app/blog/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getSortedPostData, PostData } from "@/lib/posts"; // Adjust import path if needed

export default function BlogIndex() {
  // Fetch data directly in the Server Component
  const allPostsData: PostData[] = getSortedPostData();

  return (
    <div className="container mx-auto p-4 overflow-hidden">
      <ul className="space-y-4 overflow-y-hidden scrollbar-hide max-h-screen">
        {allPostsData.map(({ title, date, excerpt, slug, image }) => (
          <li key={slug} className="rounded-lg p-4 shadow-md">
            <Link href={`/blog/${slug}`}>
              <div className="flex flex-row items-center">
                <Image
                  width="200"
                  height="200"
                  src={`${image}`}
                  alt={title}
                  className="rounded-lg mb-4"
                />
                <div className="flex flex-col items-start ml-4"> 
                <h2 className="text-xl font-bold mb-2 text-white">{title}</h2>
                <p className="text-gray-300">{excerpt}</p>
                <p className="text-gray-500 text-sm">{date}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}