import React from 'react'
import logo from '../assets/logo1.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getIsLoggedIn } from '../store/users'
import NavProfile from './NavProfile'

const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn())

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img
                        src={logo}
                        height="22"
                        className="d-inline-block align-text-top"
                        alt="eCommerce"
                    />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarNavDropdown"
                >
                    <ul className="navbar-nav ms-auto">
                        {isLoggedIn ? (
                            <NavProfile />
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" to="auth/login">
                                    <i
                                        className="bi bi-person-fill"
                                        style={{ fontSize: '18px' }}
                                    >
                                        Войти
                                    </i>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
