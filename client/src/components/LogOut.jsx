import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetCartProduct } from '../store/cartProduct'
import { logOut } from '../store/users'
import Loader from './loader/Loader'

const LogOut = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(logOut())
        dispatch(resetCartProduct())
        navigate('/')
    }, [])
    return <Loader />
}

export default LogOut
