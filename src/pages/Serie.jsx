import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { _axios } from '../_config'

const Serie = () => {
    // const styles = {}
    let useQuery = () => new URLSearchParams(useLocation().search);
    let queries = useQuery();
    let [serieInfo, setSerieInfo] = useState({})
    let [visibleSeason, setVisibleSeason] = useState([0])

    useEffect(() => {
        let controller = new AbortController();
        _axios.get(`/series/${queries.get('id')}`, { signal: controller.signal })
            .then(response => {
                let { data: res } = response;
                if (res.code === "#Success") {
                    setSerieInfo(res.data)
                }
            })
    }, [queries])
    return (
        <div>
            <NavBar active={'Series'} />
            <div className="main w-full h-screen pt-9 grid place-content-center">
                <div className="hero">
                    <img src={serieInfo.posterURL} alt={serieInfo.title} />
                    <div className="textContent">
                        <h1>{serieInfo.title}</h1>
                        <p>{serieInfo.description}</p>
                    </div>
                </div>
                <div className="seasonsSelector">
                    {Object.keys(serieInfo.seasons).map((x, i) => {
                        return (
                            <div onClick={() => setVisibleSeason(i)} className={`${visibleSeason === i ? 'bold' : ''}`}>{x}</div>
                        )
                    })}
                </div>
                <div className="seasons relative">
                    {
                        Object.values(serieInfo.seasons).map((season, sIndex) => {
                            return (
                                <div key={sIndex} className={`${visibleSeason === sIndex ? '': 'hidden'} absolute w-full h-full top-0 left-0`}>
                                    {season.map((episode, eIndex) => {
                                        return (
                                            <div key={eIndex}>
                                                {/* <img src={episode.posterURL} alt="" /> */}
                                                <h2>{episode.title}</h2>
                                                <p>{episode.description}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Serie