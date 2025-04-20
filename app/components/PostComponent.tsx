/**
 * PostComponent.tsx
 *
 * Displays a single blog post on the on main blog page with a title, excerpt, and image.
 */

import Link from "next/link";
import Image from "next/image";

export default function PostComponent({
  title,
  excerpt,
  image,
  slug,
}: {
  title: string;
  excerpt: string;
  image: string;
  slug: string;
}) {
  // Get the image from the public folder
  // Assert that the image exists
  const imagePath = require(`${image}`);

  // Create a box with rounded corners, a white border, and a shadow effect
  return (
    <div className="rounded-lg border border-gray-200 shadow-md p-4 mb-4">
      <Link href={`/blog/${slug}`}>
        <div className="flex flex-col items-center">
          <Image
            src={imagePath}
            alt={title}
            width={400}
            height={200}
            className="rounded-lg mb-4"
          />
          <h2 className="text-xl font-bold mb-2 text-white">{title}</h2>
          <p className="text-gray-300">{excerpt}</p>
        </div>
      </Link>
    </div>
  );
}
