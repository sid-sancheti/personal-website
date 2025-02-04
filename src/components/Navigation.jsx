import { useEffect } from "react";

const Navigation = () => {

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
