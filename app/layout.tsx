// Base Layout with rectangle, header, footer, and sphere.
"use client";
import Head from "next/head";
import Sphere from "@/components/Sphere";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

import "./global.css";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className="bg-[#222]">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sid Sancheti&apos;s Website</title>
        <link rel="icon" type="image/jpg" href="/favicon.jpg" />
      </Head>

      <body className="m-0 p-0 overflow-hidden bg-[#222]">
        {/* {loading ? (
          <Loader />
        ) : ( */}
          <>
            <div id="header" className="w-full h-[4vh]"></div>
            <div
              id="rectangle"
              className="w-[96vw] h-[90vh] mx-auto border border-white"
            >
              <h1>Sid Sancheti</h1>
              <div className="flex flex-row w-full p-0 m-0">
                <Navigation />
                {/* Layout UI */}
                {/* Place children where you want to render a page or nested layout */}
                <main className="overflow-y-auto scrollbar-hidden relative w-[70vw] h-[60vh] ml-[2vw] mt-[2vh] z-2">{children}</main>
              </div>
              <Sphere />
            </div>
            <Footer />
          </>
        {/* )} */}
      </body>
    </html>
  );
}
