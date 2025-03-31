// Base Layout with rectangle, header, footer, and sphere.
import Sphere from "./components/Sphere";
import Navigation from "./components/Navigation";

import "./global.css";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <div className={styles.rectangle}>
          <h1>Sid Sancheti</h1>
          <div className={styles.layout}>
            <Navigation />
            {/* Layout UI */}
            {/* Place children where you want to render a page or nested layout */}
            <main className={styles.scroll_container}>{children}</main>
          </div>
          <Sphere />
        </div>
      </body>
    </html>
  );
}
