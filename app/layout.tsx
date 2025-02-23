// Base Layout with rectangle, header, footer, and sphere.
import Sphere from './components/Sphere';

import styles from './styles.module.css';
import './global.css';

export default function BaseLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <head>
        <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Sid Sancheti's Website</title>
            <link rel="icon" type="image/jpg" href="/favicon.jpg" />
        </head>
        <body>
            <div className={styles.rectangle}>
                {/* Layout UI */}
                {/* Place children where you want to render a page or nested layout */}
                <main>{children}</main>
                <Sphere />
            </div>
        </body>
      </html>
    )
}