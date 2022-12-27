import React from 'react'
import { useSelector } from 'react-redux'
import { useRoutes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from './components/NavBar'
import AppLoader from './hoc/AppLoader'
import routes from './routes'
import { getIsLoggedIn, getUserData } from './store/users'

function App() {
    const isLoggedIn = useSelector(getIsLoggedIn())
    const userData = useSelector(getUserData())
    const elements = useRoutes(routes(isLoggedIn, userData?.isAdmin))
    return (
        <>
            <AppLoader>
                <NavBar />
                {elements}
            </AppLoader>
            <ToastContainer />
        </>
    )
}

export default App
