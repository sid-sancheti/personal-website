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
          <Link href="/" className={styles.link} prefetch={true}>Home</Link>
          <Link href="/blog" className={styles.link} prefetch={true}>Blog</Link>
          <Link href="/projects" className={styles.link} prefetch={true}>Projects</Link>
          <Link href="/about" className={styles.link} prefetch={true}>About</Link>
          <Link href="/fish" className={styles.link} prefetch={true}>Fish</Link>
        </ul>
      </nav>
    </>
  );
}
