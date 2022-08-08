import { Button } from "@mui/material"
import { Logout, Add } from "@mui/icons-material"

const Profiles = () => {
    return (
        <div className="ProfilesPage">
            <nav className="px-4 py-6 flex flex-row items-center justify-between fixed w-full top-0 left-0 h-20">
                <img src="Vector.svg" alt="TheLogo" className="h-9" />
                <Button startIcon={<Logout sx={{ fill: "white" }} />} sx={{
                    color: "white",
                    backgroundColor: "red",
                    textTransform: "capitalize",
                    padding: "7px 17px",
                    fontSize: "1rem",
                    borderRadiues: "2px"
                }} className="testBut" href="/login">Logout</Button>
            </nav>
            <div className="main w-full h-screen pt-9 grid place-content-center">
                <div className="flex flex-row items-center gap-3">
                    {
                        [{ name: "Honore", profile: "ProfilePicture.png", id: "0321" }].map((x, i) => <div key={i} className="text-white text-center hover:cursor-pointer hover:-rotate-1">
                            <img src={x.profile} alt={x.profile} />
                            <span className="text-lg font-bold">{x.name}</span>
                        </div>)
                    }
                    <div className="AddProfile bg-slate-700 h-20 w-20 rounded-full grid place-content-center cursor-pointer hover:h-24 hover:w-24"><Add sx={{ fill: "white" }} /></div>
                </div>
            </div>
        </div>
    )
}

export default Profiles