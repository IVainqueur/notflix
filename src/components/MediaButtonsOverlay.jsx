import { FastForwardRounded, FastRewindRounded, PauseRounded, PlayArrowRounded } from '@mui/icons-material';
import { useState } from 'react';
import LoadSVG from './LoadSVG';

const MediaButtonsOverlay = ({ styles, mediaButtonClick, isPlaying, isLoading, maxTime }) => {
    const [time, setTime] = useState(0);
    const onSeekHandler = ({ target }) => {
        setTime(Number(target.value))
    }
    return (
        <div className={`${styles.mediaButtonsOverlay}  ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
            <div className={styles.mediaButtonsContainer} style={{ transform: "translate(-50%,-50%)" }}>
                <div
                    id="Rewind"
                    className={`${styles.mediaButtonContainer}`}
                    onClick={(e) => mediaButtonClick(e, 'rewind')}
                >
                    <FastRewindRounded sx={{ fill: "white", cursor: "pointer" }} />
                </div>
                <div
                    id="Play"
                    className={styles.mediaButtonContainer}
                    onClick={(e) => mediaButtonClick(e, 'play')}
                >
                    {isLoading
                        ?
                        <LoadSVG size={"80px"} />
                        :
                        (!isPlaying ? <PlayArrowRounded sx={{ fill: "white", cursor: "pointer" }} /> : <PauseRounded sx={{ fill: "white", cursor: "pointer" }} />)}
                </div>
                <div
                    id="Forward"
                    className={styles.mediaButtonContainer}
                    onClick={(e) => mediaButtonClick(e, 'forward')}
                >
                    <FastForwardRounded sx={{ fill: "white", cursor: "pointer" }} />
                </div>

            </div>
            <div className='absolute bottom-0 left-0 w-full'>
                <input type='range' className={'w-full block cursor-pointer'} value={time} min={0} max={100} onChange={onSeekHandler} />
            </div>
        </div>
    )
}

export default MediaButtonsOverlay