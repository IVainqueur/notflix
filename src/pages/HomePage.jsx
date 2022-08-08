import { ChevronLeft, ChevronRight, PlayArrow } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { _axios } from "../_config"
import NavBar from "../components/NavBar"

const HomePage = () => {
    const [favs, setFavs] = useState([])
    const getFanFavs = (signal) => {
        _axios.get('/fan-favorites', { signal: signal })
            .then(response => {
                console.log("Reached here")
                let { data: res } = response;
                if (res.code === "#Success") {
                    let classified = []
                    for (let movie of res.data) {
                        movie._othersources = []
                        for (let othersource of movie.othersources.split(', ')) {
                            movie._othersources.push({
                                url: othersource.split(' ')[0],
                                size: othersource.split(' ')[1]
                            })
                        }
                        movie.othersources = movie._othersources
                        classified.push(movie)
                    }
                    setFavs(classified)
                    console.log(classified[0].othersources)
                }
                console.log(res)
            })
            .catch(e => console.log("[ERROR]"))
    }
    useEffect(() => {
        console.log("Sending Request")
        let controller = new AbortController();
        getFanFavs(controller.signal)
        return () => {
            console.log("The component got unmounted")
            controller.abort();
        }

    }, [])
    const chevronStyle = {
        fill: "white",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        padding: "0.625rem",
        borderRadius: "50%",
        backgroundColor: "rgba(0,0,0,0.3)",
        backdropFilter: "blur(0.5rem)",
        height: "3.125rem",
        width: "3.125rem",
        zIndex: "1",
        cursor: "pointer"
    }

    return (
        <div className="HomePage">
            <NavBar active={'Home'} />
            <div className="main pt-20 w-full h-full text-white">
                <h1 className="font-bold text-xl px-7 mb-4">Today's fan-favorites</h1>
                <div className="TodayFavorites flex flex-row gap-2  w-full overflow-y-auto overflow-x-scroll px-7 custom-scroll pb-1">
                    <>
                        {(favs.length === 0)
                            ?
                            <p>Loading ...</p>
                            :
                            <>
                                <ChevronLeft sx={{ ...chevronStyle, left: "0.625rem" }} />
                                {
                                    favs.map((x, i) => {
                                        /* TODO: Use the largest sized thumbnail */
                                        return (
                                            <div key={i} className="Fav relative flex flex-col gap-1 pb-6 text-white min-w-[14.1875rem] max-w-[14.1875rem] rounded overflow-hidden bg-[#ffffff11] backdrop-blur">
                                                <div className="relative">
                                                    <img src={x.othersources[2] ? x.othersources[2].url : x.thumbnail} alt={x.title} className="w-[14.1875rem] h-[21rem] object-cover" />
                                                    <div className="after:content-[''] after:h-full after:w-full after:bg-[#000000b6] after:absolute after:top-0 after:left-0 opacity-0 hover:opacity-100 cursor-pointer">
                                                        <PlayArrow sx={{ fill: "white", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 2 }} />
                                                    </div>
                                                </div>
                                                <span className="text-ellipsis overflow-hidden whitespace-nowrap pl-3">{x.title}</span>

                                            </div>
                                        )
                                    })
                                }
                                <ChevronRight sx={{ ...chevronStyle, right: '0.625rem' }} />
                            </>
                        }
                    </>
                </div>
            </div>
        </div>
    )
}

export default HomePage