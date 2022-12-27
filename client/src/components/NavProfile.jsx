import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCartProducts } from '../store/cartProduct'
import { getUserData } from '../store/users'

const NavProfile = () => {
    const user = useSelector(getUserData())
    const cartProducts = useSelector(getCartProducts())

    const getBadgeClasses = () => {
        return (
            'position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success' +
            (cartProducts.length === 0 ? ' visually-hidden' : '')
        )
    }
    const [isOpen, setOpen] = useState(false)

    const toggleMenu = () => {
        setOpen((prevState) => !prevState)
    }

    if (!user) return 'loading'
    return (
        <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown" onClick={toggleMenu}>
                <div className="nav-link  dropdown-toggle" role="button">
                    <i
                        className="bi bi-person-fill"
                        style={{ fontSize: '18px' }}
                    >
                        {user.name}
                    </i>
                </div>
                <div
                    className={
                        'mt-1 w-2 dropdown-menu' + (isOpen ? ' show' : '')
                    }
                >
                    {user.isAdmin && (
                        <Link to="/admin" className="dropdown-item">
                            Админ панель
                        </Link>
                    )}
                    <Link to="/logout" className="dropdown-item">
                        Выйти
                    </Link>
                </div>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="cart">
                    <div className="position-relative">
                        <i
                            className="bi bi-cart-fill"
                            style={{
                                fontSize: '18px'
                            }}
                        >
                            Корзина{' '}
                            {cartProducts && (
                                <span className={getBadgeClasses()}>
                                    {cartProducts.length}
                                </span>
                            )}
                        </i>
                    </div>
                </Link>
            </li>
        </ul>
    )
}

export default NavProfile
