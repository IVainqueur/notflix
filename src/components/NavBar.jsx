import { Home, LiveTv, Logout, Movie } from "@mui/icons-material"
import { Button } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import SearchBar from "./SearchBar"

const NavBar = ({ active, searchQuery }) => {
    const navigator = useNavigate();
    const activeClasses = `after:content-[''] after:rounded-3xl after:bg-white after:h-[0.125rem] after:w-[100%] after:absolute after:bottom-0 after:left-0`
    return (
        <nav className="px-4 py-6 flex flex-row items-center justify-between fixed w-full top-0 left-0 h-20 text-white">
            <img src="Vector.svg" alt="TheLogo" className="h-9" />
            <div className="others flex flex-row items-center gap-5">
                <SearchBar searchQuery={searchQuery}/>
                <Link to={''} className={`flex flex-row font-bold items-center gap-1 py-1 px-2 rounded cursor-pointer relative ${active === 'Home' ? activeClasses : ''}`} title="🏠 Home">
                    <Home sx={{ fill: "white" }} />
                    <span className="hidden lg:inline">Home</span>
                </Link>
                <Link to={''} className={`flex flex-row font-bold items-center gap-1 p-1 rounded cursor-pointer relative ${active === 'Movies' ? activeClasses : ''}`} title="🎬 Movies">
                    <Movie sx={{ fill: "white" }} />
                    <span className="hidden lg:inline">Movies</span>
                </Link>
                <Link to={''} className={`flex flex-row font-bold items-center gap-1 p-1 rounded cursor-pointer relative ${active === 'Series' ? activeClasses : ''}`} title="📺 Series">
                    <LiveTv sx={{ fill: "white" }} />
                    <span className="hidden lg:inline">Series</span>
                </Link>
                <Button startIcon={<Logout sx={{ fill: "white" }} />} sx={{
                    color: "white",
                    backgroundColor: "red",
                    textTransform: "capitalize",
                    padding: "7px 17px",
                    fontSize: "1rem",
                    borderRadiues: "2px"
                }} className="testBut" onClick={()=>navigator('/login')}>Logout</Button>
            </div>
        </nav>
    )
}

export default NavBar