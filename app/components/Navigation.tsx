/**
 * Navigation component
 */
"use client";

import Link from "next/link";

export default function Navigation() {
  const navCSS = "text-white mx-3 hover:text-[#aaa]";
  return (
    <>
      <nav className="ml-[2vw]">
        <ul>
          <Link href="/" prefetch={true} className={navCSS}>Home</Link>
          <Link href='/blog' prefetch={true} className={navCSS}>Blog</Link>
          <Link href='/projects' prefetch={true} className={navCSS}>Projects</Link>
          <Link href='/about' prefetch={true} className={navCSS}>About</Link>
          <Link href='/fish' prefetch={true} className={navCSS}>Fish</Link>
        </ul>
      </nav>
    </>
  )
  // return (
  //   <>
  //     <nav className="m-[1vw]">
  //       <li className="p-0 m-0 ml-[1vw] w-[150px] text-white font-[Exo]">
  //         <Link
  //           href="/"
  //           className="block px-[15px] py-[10px] no-underline hover:text-[#aaa]"
  //           prefetch={true}
  //         >
  //           Home
  //         </Link>
  //         <Link
  //           href="/blog"
  //           className="block px-[15px] py-[10px] no-underline hover:text-[#aaa]"
  //           prefetch={true}
  //         >
  //           Blog
  //         </Link>
  //         <Link
  //           href="/projects"
  //           className="block px-[15px] py-[10px] no-underline hover:text-[#aaa]"
  //           prefetch={true}
  //         >
  //           Projects
  //         </Link>
  //         <Link
  //           href="/about"
  //           className="block px-[15px] py-[10px] no-underline hover:text-[#aaa]"
  //           prefetch={true}
  //         >
  //           About
  //         </Link>
  //         <Link
  //           href="/fish"
  //           className="block px-[15px] py-[10px] no-underline hover:text-[#aaa]"
  //           prefetch={true}
  //         >
  //           Fish
  //         </Link>
  //       </li>
  //     </nav>
  //   </>
  // );
}
