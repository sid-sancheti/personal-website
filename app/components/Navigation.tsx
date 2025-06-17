/**
 * Navigation component
 */
"use client";

import Link from "next/link";

export default function Navigation() {
  return (
    <>
      <nav className="flex relative m-[1vw]">
        <ul className="list-none p-0 m-0 ml-[1vw] w-[200px] text-white font-[Exo]">
          <Link
            href="/"
            className="block px-[15px] py-[10px] no-underline hover:text-[#aaa]"
            prefetch={true}
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="block px-[15px] py-[10px] no-underline hover:text-[#aaa]"
            prefetch={true}
          >
            Blog
          </Link>
          <Link
            href="/projects"
            className="block px-[15px] py-[10px] no-underline hover:text-[#aaa]"
            prefetch={true}
          >
            Projects
          </Link>
          <Link
            href="/about"
            className="block px-[15px] py-[10px] no-underline hover:text-[#aaa]"
            prefetch={true}
          >
            About
          </Link>
          <Link
            href="/fish"
            className="block px-[15px] py-[10px] no-underline hover:text-[#aaa]"
            prefetch={true}
          >
            Fish
          </Link>
        </ul>
      </nav>
    </>
  );
}
