import { FastForwardRounded, FastRewindRounded, PauseRounded, PlayArrowRounded } from '@mui/icons-material';
import LoadSVG from './LoadSVG';

const MediaButtonsOverlay = ({ styles, mediaButtonClick, isPlaying, isLoading, _time }) => {
    // const onSeekHandler = ({ target }) => {
    //     setTime(Number(target.value))
    // }
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
                <progress min={0} value={Math.round(_time.current)} max={Math.round(_time.max)} color={'red'} className="w-full" onClick={(e)=> console.log(e)}></progress>
            </div>
        </div>
    )
}

export default MediaButtonsOverlay