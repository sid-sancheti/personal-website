import {Link} from "react-router-dom";

const Navigation = () => {
    return (
        // I may need to remove the astro-prefetch attribute
        <nav>
        <ul class="vertical-nav">
            <li><a href="/" data-astro-prefetch="load">Home</a></li>
            <li><a href="/blogs" data-astro-prefetch="load">Blogs</a></li>
            <li><a href="/about" data-astro-prefetch="load">About</a></li>
            <li><a href="/fish" data-astro-prefetch="load">Fish</a></li>
            <li><a href="/music" data-astro-prefetch="load">Music</a></li>
        </ul>
        </nav>
    )
}

export default Navigation;