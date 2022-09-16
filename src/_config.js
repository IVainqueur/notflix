import axios from "axios"
import Swal from "sweetalert2";

// export const BASE_URL = "http://0.0.0.0:8080"
//export const BASE_URL = "https://iv-notflix.herokuapp.com"
export const BASE_URL = "https://web-production-5248.up.railway.app"

/**
 * An instance of axios which has some default params that are going to be shared across all network requests
 */
let _axios = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

const ErrorToast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    icon: "error",
    color: "#FFF",
    background: `#5e2426`,
    showCloseButton: true
});

_axios.interceptors.response.use((response) => {
    let { data: res } = response;
    if (["#InvalidToken", "#NoTokenNoEntry"].includes(res.code)) {
        window.location.pathname = "/login";

    } else if (res.code === "#Error") {
        ErrorToast.fire(res.message)
    }
    return response
})

export { _axios }

