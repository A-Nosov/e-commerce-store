import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
    getIsLoggedIn,
    getUsersLoadingStatus,
    loadCurrentUser
} from '../store/users'
import { loadProductsList } from '../store/products'
import { loadBrandsList } from '../store/brands'
import { loadSizesList } from '../store/size'
import { loadUserCartProductsList } from '../store/cartProduct'
import Loader from '../components/loader/Loader'

const AppLoader = ({ children }) => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(getIsLoggedIn())
    const usersStatusLoading = useSelector(getUsersLoadingStatus())
    useEffect(() => {
        dispatch(loadProductsList())
        dispatch(loadBrandsList())
        dispatch(loadSizesList())
        if (isLoggedIn) {
            dispatch(loadCurrentUser())
            dispatch(loadUserCartProductsList())
        }
    }, [isLoggedIn])
    if (usersStatusLoading) return <Loader />
    return children
}

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}
export default AppLoader
