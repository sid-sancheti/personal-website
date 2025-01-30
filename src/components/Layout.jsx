import {Outlet, Link} from 'react-router-dom';

function Layout() {
    return (
        <div class="rectangle" style={{width: '97vw', height: '90vh', marginLeft: '1vw', marginTop: '2vh', border: '2px solid white'}}>
            <header>
                <h1>Sid Sancheti</h1>
                <nav> <ul class="vertical-nav">
                    <Link to="/">Home</Link>
                    <Link to="/blogs">Blogs</Link>
                    <Link to="/about">About</Link>
                    <Link to="/fish">Fish</Link>
                    <Link to="/music">Music</Link>
                </ul></nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout;