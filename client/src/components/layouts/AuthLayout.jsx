import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="card mt-5 p-3" style={{ width: 400 }}>
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout
