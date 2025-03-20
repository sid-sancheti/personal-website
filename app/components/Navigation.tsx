/**
 * Navigation component
 */
'use client';

import Link from 'next/link';
import styles from '../styles.module.css';

export default function Navigation() {
  return (
    <>
        <nav className={styles.nav}>
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/about">About</Link>
            <Link href="/fish">Fish</Link>
        </nav>
    </>
  );
}
