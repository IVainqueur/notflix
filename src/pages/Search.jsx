import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useMemo, useState } from "react";
import { _axios } from "../_config";
import NavBar from "../components/NavBar";
import { LiveTv, Movie } from "@mui/icons-material";
import LoadSVG from "../components/LoadSVG";

const Search = () => {
    const navigator = useNavigate();
    const useQuery = () => new URLSearchParams(useLocation().search);
    let query = useQuery();
    let searchVal = useMemo(() => query.get('q'), [query])
    let [results, setResults] = useState([])
    useEffect(() => {
        setResults([])
        let controller = new AbortController()
        _axios.get(`/find/${searchVal ? searchVal : ''}/false`, { signal: controller.signal })
            .then(response => {
                let { data: res } = response;
                if (res.code === "#Success") {
                    console.log(res.data)
                    setResults(res.data)
                }
            })

        return () => {
            console.log("unmounting search")
            controller.abort();
        }
    }, [searchVal])
    const onClickHandler = ({ target }) => {
        if (target.attributes['data-watch-url']) {
            let url = target.attributes['data-watch-url'].value;
            let type = target.attributes['data-type'].value;
            if (type === 'movie') {
                navigator(`/watch?service=goojara&link=${url}`)
            } else {
                navigator(`/serie?id=${url}`)
            }
        }
    }
    return (
        <div className="text-white">
            <NavBar searchQuery={query.get('q')} />
            <div className="main pt-20 w-full h-full text-white">
                <div className="results m-auto w-full max-w-[43rem]">
                    <p className="text-3xl mb-4">{results.length} results for `{searchVal}`</p>
                    {results.length === 0
                        ?
                        <p className=""><LoadSVG size={'120px'} /></p>
                        :
                        results.map((x, i) => {
                            return (
                                <div
                                    className={`result flex flex-row mb-1 items-center rounded h-[4.125rem] ${x.from === "IMDB" ? 'bg-[#ffd70030] hover:bg-[#ffd70050]' : 'bg-[#2d6ab130] hover:bg-[#2d6ab150]'} w-full mx-2 cursor-pointer`} key={i} data-type={x.type} data-watch-url={x.from === "GOOJARA" ? x.url.match(/goojara\.to\/(\w+)/)[1] : ''}
                                    onClick={onClickHandler}
                                >
                                    <div className={`h-full w-3 ${x.from === "IMDB" ? 'bg-[#ffd700]' : 'bg-[#2d6ab1]'} rounded-l`}></div>
                                    <div className="content flex flex-row items-center p-2 gap-3">
                                        {x.thumbnail && <img src={x.thumbnail} alt={'x.title'} className="h-[3.125rem] w-[3.125rem] rounded object-cover" />}
                                        {x.type ? <div className="type">{x.type === 'movie' ? <Movie /> : <LiveTv />}</div> : <></>}
                                        <div className="textContent">
                                            <span>{`${x.title} ${x.year ? `(${x.year})` : ''}`}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
        </div >
    )
}

export default Search