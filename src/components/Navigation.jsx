import { useEffect } from "react";

const Navigation = () => {
    useEffect(() => {
        document.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                window.location.href = link.href; // Simulate a normal full-page navigation
            });
        });
    }, []);

    return (
        <nav>
            <ul className="vertical-nav">
                <li><a className="nav-link" href="/">Home</a></li>
                <li><a className="nav-link" href="/blogs">Blogs</a></li>
                <li><a className="nav-link" href="/about">About</a></li>
                <li><a className="nav-link" href="/fish">Fish</a></li>
                <li><a className="nav-link" href="/music">Music</a></li>
            </ul>
        </nav>
    );
};

export default Navigation;
