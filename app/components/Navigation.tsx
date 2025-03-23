/**
 * Navigation component
 */
"use client";

import Link from "next/link";
import styles from "../styles.module.css";

export default function Navigation() {
  return (
    <>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <Link href="/" className={styles.link}>Home</Link>
          <Link href="/blog" className={styles.link}>Blog</Link>
          <Link href="/projects" className={styles.link}>Projects</Link>
          <Link href="/about" className={styles.link}>About</Link>
          <Link href="/fish" className={styles.link}>Fish</Link>
        </ul>
      </nav>
    </>
  );
}
