import React, { useState, useEffect } from 'react'
import TextField from '../form/TextField'
import { NavLink, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthErrors, login } from '../../store/users'

const LogInPage = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loginError = useSelector(getAuthErrors())
    const [errors, setErrors] = useState({})

    const validateScheme = yup.object().shape({
        password: yup
            .string()
            .required('Пароль обязателен для заполнения')
            .matches(
                /^(?=.*[A-Z])/,
                'Пароль должен содержать хотя бы одну заглавную букву'
            )
            .matches(
                /(?=.*[0-9])/,
                'Пароль должен содержать хотя бы одно число'
            )
            .matches(
                /(?=.*[!@#$%^&*])/,
                'Пароль должен содержать один из специальных символов !@#$%^&*'
            )
            .matches(
                /(?=.{8,})/,
                'Пароль должен состоять минимум из 8 символов'
            ),
        email: yup
            .string()
            .required('Электронная почта обязательна для заполнения')
            .email('Email введен некорректно')
    })

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const validate = () => {
        validateScheme
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }))
        return Object.keys(errors).length === 0
    }
    const isValid = Object.keys(errors).length === 0

    useEffect(() => {
        validate()
    }, [data])

    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        dispatch(login({ payload: data }))
        navigate('/')
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Вход</h2>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            {loginError && <p className="text-danger">{loginError}</p>}
            <button
                className="btn btn-primary w-100 mx-auto mt-4"
                type="submit"
                disabled={!isValid}
            >
                Войти
            </button>
            <p className="mt-2">
                Нет аккаунта?{' '}
                <NavLink to="/auth/signup">Зарегистрируйтесь!</NavLink>
            </p>
        </form>
    )
}

export default LogInPage
