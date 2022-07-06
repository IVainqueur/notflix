import {useState} from 'react'
import { _axios } from '../_config'
import Loader from './Loader';

function AccessCheck({ children }) {
    const [hasAccess, setHasAccess] = useState(false);
    _axios.get('/user/checkaccess').then((response)=> {
        if(response.data.code !== "#AccessIsAvailable") return response
        setHasAccess(true)
    });
    return (
        <>
            {!hasAccess ? <Loader /> : children}
        </>
    )
}

export default AccessCheck