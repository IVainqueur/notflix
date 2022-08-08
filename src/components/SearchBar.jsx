import { Search } from "@mui/icons-material"
import { InputAdornment, OutlinedInput } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const SearchBar = ({searchQuery}) => {
    const navigator = useNavigate();
    let val = searchQuery ? searchQuery : '';
    const [search, setSearch] = useState(val);
    const onKeyupHandler = ({ key }) => {
        if (key === "Enter") {
            navigator(`/search?q=${search}`)
        }
    }
    const onChangeHandler = ({ target }) => {
        setSearch(target.value)
    }
    
    return (
        <OutlinedInput placeholder="Search" sx={{
            display: "flex",
            alignItems: "center",
            color: "white",
            borderRadius: "100px",
            border: "2px solid transparent",
            padding: "2px 10px",
            '&.Mui-focused': {
                borderLeft: "2px dashed #B9090B",
                backgroundColor: "#B9090B20"
            },
            '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: "0 !important",
            }
        }} 
        inputProps={{
            style: {
                padding: "5px 10px"
            },
        }} 
        startAdornment={<InputAdornment position="start"><Search sx={{ fill: "#ffffff90" }} /></InputAdornment>} 
        value={search}
        onKeyUp={onKeyupHandler}
        onChange={onChangeHandler}
        />
    )
}

export default SearchBar