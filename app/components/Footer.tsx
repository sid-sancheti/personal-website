"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SocialIconProps {
  src: string; // Path to the image file (e.g., in the public folder)
  alt: string; // Alt text for the image
  href: string; // URL for the link
  width: number;
  height: number;
}

/**
 * SocialIcon Component
 * A reusable component for displaying clickable social media icons.
 * It uses a standard <img> tag for image loading.
 */
const SocialIcon: React.FC<SocialIconProps> = ({ src, alt, href, width, height }) => {
  return (
    <a
      href={href}
      target="_blank" // Opens the link in a new tab
      rel="noopener noreferrer" // Security best practice for target="_blank"
      aria-label={`${alt} profile`} // Accessibility label
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        // className="rounded-full" // Apply rounded corners to the image itself
        // Fallback for image loading error - use a placeholder
        onError={(e) => {
          e.currentTarget.src = `https://placehold.co/32x32/cccccc/ffffff?text=X`; // Placeholder
          e.currentTarget.onerror = null; // Prevent infinite loops
        }}
      />
    </a>
  );
};

export default function Footer() {
  return (
    <div>
      <footer className="w-full h-[6vh] text-white items-center justify-left flex mx-[2vw] gap-x-2">
        {/* <div className="m-0">© Sid Sancheti 2025</div>
        <span className="mx-3 text-lg align-middle leading-none">•</span>  */}
        <div className="text-s">© Sid Sancheti 2025</div>
        <span className="ml-0.5 mr-2 text-lg align-middle leading-none">•</span>
        <SocialIcon
          src="/github.svg"
          alt="GitHub"
          href="https://github.com/sid-sancheti"
          width={48}
          height={48}
        />
        <span className="ml-0.5 mr-3 text-lg align-middle leading-none">•</span> 
        <SocialIcon
          src="/linkedin.svg"
          alt="LinkedIn"
          href="https://www.linkedin.com/in/sid-sancheti/"
          width={30}
          height={30}
        />
        <span className="ml-0.5 mr-3 text-lg align-middle leading-none">•</span>
        <Link href='https://www.github.com/sid-sancheti/personal-website' className="text-white hover:text-gray-300">
          <span className="text-s">Source</span>
        </Link>
      </footer>
    </div>
  );
}
