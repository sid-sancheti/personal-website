---
title: 'My First Post!'
slug: '/first-post/'
date: '03-24-2025'
author: 'Sid Sancheti'
excerpt: 'The development of my personal website was a long, but rewarding process. It a significant undertaking, but also extremly rewarding. I have deployed on my Raspberry Pi that I picked up last October, and I am self-hosting. In order to get practice with some tools, I have used a Docker container in a CI/CD pipeline, a Kubernetes cluster for automated load managment, configured Cloudflare for DNS tools and DDoS protection.'
preview: '/favicon.jpg'
---

Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.

- **Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request.
- **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.

Importantly, Next.js lets you **choose** which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.
