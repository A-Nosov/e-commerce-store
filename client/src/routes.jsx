import React from 'react'
import { Navigate } from 'react-router-dom'
import AddNewProductPage from './components/pages/AddNewProductPage'
import EditProductPage from './components/pages/EditProductPage'
import AuthLayout from './components/layouts/AuthLayout'
import LogOut from './components/LogOut'
import AdminPage from './components/pages/AdminPage'
import CartPage from './components/pages/CartPage'
import LogInPage from './components/pages/LoginPage'
import MainPage from './components/pages/MainPage'
import ProductPage from './components/pages/ProductPage'
import SignUpPage from './components/pages/SignupPage'

const routes = (isLoggedIn, isAdmin) => [
    {
        path: '/',
        element: <MainPage />
    },
    {
        path: 'auth',
        element: <AuthLayout />,
        children: [
            {
                path: '',
                element: <Navigate to="/auth/signup" />
            },
            {
                path: 'login',
                element: <LogInPage />
            },
            {
                path: 'signup',
                element: <SignUpPage />
            },
            { path: '*', element: <Navigate to="/auth/signup" /> }
        ]
    },
    {
        path: 'products/:productId',
        element: <ProductPage />
    },
    {
        path: 'addProduct',
        element: isAdmin ? <AddNewProductPage /> : <Navigate to="/" />
    },
    {
        path: 'editProduct/:productId',
        element: isAdmin ? <EditProductPage /> : <Navigate to="/" />
    },
    {
        path: 'cart',
        element: isLoggedIn ? <CartPage /> : <Navigate to="/auth/login" />
    },
    {
        path: 'admin',
        element: isAdmin ? <AdminPage /> : <Navigate to="/" />
    },
    {
        path: 'logout',
        element: <LogOut />
    },
    {
        path: '*',
        element: <Navigate to="/" />
    }
]

export default routes
