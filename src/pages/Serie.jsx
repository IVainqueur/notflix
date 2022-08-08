import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LoadSVG from '../components/LoadSVG'
import NavBar from '../components/NavBar'
import { _axios } from '../_config'

const Serie = () => {
    let useQuery = () => new URLSearchParams(useLocation().search);
    let queries = useQuery();
    let [serieInfo, setSerieInfo] = useState({})
    let [visibleSeason, setVisibleSeason] = useState(0)

    useEffect(() => {
        let controller = new AbortController();
        _axios.get(`/serie/${queries.get('id')}`, { signal: controller.signal })
            .then(response => {
                let { data: res } = response;
                if (res.code === "#Success") {
                    console.log(res)
                    setSerieInfo(res.data)
                }
            })
    }, [queries])
    return (
        <div className='min-h-fit h-screen'>
            <NavBar active={'Series'} />
            <div className="main w-screen max-w-[70rem] m-auto h-screen pt-11 text-white">
                {
                    Object.keys(serieInfo).length === 0
                        ?
                        <LoadSVG size={'120px'} />
                        :

                        <>
                            <div className="hero flex gap-2 mt-6 mb-4">
                                <img src={serieInfo.posterURL} alt={serieInfo.title} className={'h-44 w-28 object-cover'} />
                                <div className="textContent">
                                    <h1 className='text-xl font-bold mb-3'>{serieInfo.title}</h1>
                                    <p>{serieInfo.description}</p>
                                </div>
                            </div>
                            <div className="seasonsSelector flex flex-row items-center gap-1">
                                {serieInfo.seasons.map((x, i) => {
                                    return (
                                        <div key={i} onClick={() => setVisibleSeason(i)} className={`${visibleSeason === i ? 'bold bg-slate-600' : 'bg-slate-900'} rounded-t px-2 py-1 cursor-pointer`}>Season {x.season}</div>
                                    )
                                })}
                            </div>
                            <div className="seasons relative">
                                {
                                    serieInfo.seasons.map((season, sIndex) => {
                                        console.log(season)
                                        return (
                                            <div key={sIndex} className={`${visibleSeason === sIndex ? '' : 'hidden'} absolute w-full h-full top-0 left-0 flex flex-col`}>
                                                {season.episodes.map((episode, eIndex) => {
                                                    return (
                                                        <Link key={eIndex} data-id={episode.episodeURL} to ={`/watch?link=${episode.episodeURL.match(/goojara\.to\/(\w+)/)[1]}&service=goojara`} className="px-2 pt-4 pb-9 cursor-pointer border-l-2 border-l-transparent border-b-[1px] border-b-[#1b1b1b] hover:bg-[#1b1b1b]  hover:border-l-red-400">
                                                            {/* <img src={episode.posterURL} alt="" /> */}
                                                            <h2 className='font-bold text-lg'>
                                                                <span className='text-lg font-bold text-red-400 mr-3'>{episode.episodeNumber} </span>
                                                                {episode.episodeTitle}
                                                            </h2>
                                                            <p>{episode.episodeDescription}</p>
                                                        </Link>
                                                    )
                                                })}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </>
                }
            </div>
        </div>
    )
}

export default Serie