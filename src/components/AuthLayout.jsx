import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Prtctd({children, authentication = true}){
    const navigate = useNavigate();
    const [loader, setloader] = useState(true);
    const authStatus = useSelector(state => state.auth.status);

    useEffect( () => {
        if(authentication && authentication!==authStatus){
            navigate('/login')
        }else if(!authentication && authentication!==authStatus){
            navigate('/')
        }
    }, [navigate, authentication, authStatus])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}