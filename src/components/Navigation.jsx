import {Link} from "react-router-dom";
import "../styles/nav.css";

const Navigation = () => {
    return (
        // I may need to remove the astro-prefetch attribute
        <nav style={{ display: "flex", flexDirection: "column", gap: "15px"}}> <ul class="vertical-nav">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/blogs" className="nav-link">Blogs</Link></li>
            <li><Link to="/about" className="nav-link">About</Link></li>
            <li><Link to="/fish" className="nav-link">Fish</Link></li>
            <li><Link to="/music" className="nav-link">Music</Link></li>
        </ul></nav>
    )
}

export default Navigation;