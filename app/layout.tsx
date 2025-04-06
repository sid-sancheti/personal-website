// Base Layout with rectangle, header, footer, and sphere.
"use client";
import Sphere from "@/components/Sphere";
import Navigation from "@/components/Navigation";
import Loader from "@/components/loader/Loader";

import { useState, useEffect } from "react";
import "./global.css";

import styles from "./styles.module.css";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // React hook to check if the page is loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Loading time in 1.5 seconds
    return () => clearTimeout(timer);
  });

  return (
    <html lang="en" className="bg-[#111111]">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/styles.css" rel="stylesheet" />
        <title>Sid Sancheti's Website</title>
        <link rel="icon" type="image/jpg" href="/favicon.jpg" />
      </head>

      <body className="m-0 p-0 overflow-hidden bg-[#111111]">
        {/* {loading ? (
          <Loader />
        ) : ( */}
          <>
            <div id="header" className="w-full h-[4vh]"></div>
            <div
              id="rectange"
              className="w-[96vw] h-[90vh] mx-auto border border-white"
            >
              <h1 className="white font-[Oxanium]">Sid Sancheti</h1>
              <div className={styles.layout}>
                <Navigation />
                {/* Layout UI */}
                {/* Place children where you want to render a page or nested layout */}
                <main className={styles.scroll_container}>{children}</main>
              </div>
              <Sphere />
            </div>
          </>
        {/* )} */}
      </body>
    </html>
  );
}
