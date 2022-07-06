import axios from "axios"

export const BASE_URL = "http://localhost:8080"

/**
 * An instance of axios which has some default params that are going to be shared across all network requests
 */
let _axios = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

_axios.interceptors.response.use((response)=>{
    let {data: res} = response;
    if(["#InvalidToken", "#NoTokenNoEntry"].includes(res.code)){
       window.location.pathname = "/login";
    }
    return response
})

export {_axios}

