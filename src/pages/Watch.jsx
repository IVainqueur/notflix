import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { useLocation } from 'react-router-dom';
import { _axios } from '../_config';
import MediaButtonsOverlay from '../components/MediaButtonsOverlay';

let currentState;
const Watch = () => {
    let [isPlaying, setIsPlaying] = useState(false)
    let [isLoading, setIsLoading] = useState(true)
    let [movieInfo, setMovieInfo] = useState({})
    const styles = {
        mediaButtonContainer: `cursor-pointer p-2 rounded-full flex items-center justify-center ${!isLoading ? 'hover:bg-slate-700 backdrop-blur' : ''}`,
        mediaButtonsContainer: `absolute top-[50%] left-[50%] flex flex-row gap-3 items-center`,
        video: `w-full h-auto max-h-[45rem] bg-slate-700`,
        mediaButtonsOverlay: `absolute w-full h-full top-0 left-0 bg-[#00000050] hover:opacity-100 z-[2]`,
        VidContainer: `VidContainer w-full m-auto relative`
    }
    const useQuery = () => new URLSearchParams(useLocation().search);
    let query = useQuery();
    let link = query.get('link');
    useEffect(() => {
        let controller = new AbortController();
        // let service = query.get('service');
        _axios.get(`/watch/goojara/${link}`)
            .then(response => {
                let { data: res } = response;
                console.log(res)
                if (res.code === "#Success") {
                    setMovieInfo(res.data)
                }
            })
        return () => {
            console.log("unmounting watch")
            controller.abort();
        }
    }, [link])
    const mediaButtonClick = (e, action) => {
        let video = document.querySelector('.VidContainer video')
        let currentTime = video.currentTime
        switch (action) {
            case 'play':
                if (video.paused) {
                    video.play()
                    // setIsPlaying(true)
                } else {
                    video.pause()
                    // setIsPlaying(false)
                }
                break;
            case 'forward':
                video.currentTime = currentTime + 10
                break;
            case 'rewind':
                video.currentTime = currentTime - 10
                break;
            default:
                return;
        }
    }
    const listenForLoad = () => {
        let video = document.querySelector('.VidContainer video')
        currentState = video.readyState
        let intervalHandler = setInterval(() => {
            if (video.readyState !== currentState) {
                console.log(`currentState changed from ${currentState} to ${video.readyState}`)
                currentState = video.readyState
                setIsLoading(currentState !== 4)
            }
        }, 500)
    }
    return (
        <div className='text-white'>
            <NavBar />
            <div className="main pt-20 w-full h-full text-white">
                {Object.keys(movieInfo).length === 0
                    ?
                    <p className='text-center'>Loading...</p>
                    :
                    <div className='w-screen max-w-[70rem] m-auto'>
                        <div className={styles.VidContainer}>
                            <MediaButtonsOverlay
                                styles={styles}
                                mediaButtonClick={mediaButtonClick}
                                isPlaying={isPlaying}
                                isLoading={isLoading}
                                onClick={() => console.log("Clicked the overlay")}
                            />
                            <video autoPlay controls={false} className={styles.video} onPlay={()=>{
                                setIsPlaying(true)
                            }} onPause={()=>{
                                setIsPlaying(false)
                            }} onLoadedMetadata={(e) => {
                                // setTimeout(() => document.querySelector('#Play').click(), 100);
                                listenForLoad();
                            }}>
                                <source src={movieInfo.videoURL} />
                            </video>
                        </div>

                        <div className='mt-3 flex flex-row gap-3'>
                            <img src={`${movieInfo.posterURL}`} alt="" className='h-[12.5rem] w-[7.5rem] object-cover' />
                            <div className="flex flex-col gap-3 px-[1.25rem]">
                                <h1 className='text-2xl font-bold'>{movieInfo.movieTitle}</h1>
                                <p className=''>{movieInfo.description}</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Watch