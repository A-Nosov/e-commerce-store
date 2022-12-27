import React, { useState, useEffect } from 'react'
import TextField from '../form/TextField'
import RadioField from '../form/RadioField'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { signUp } from '../../store/users'

const SignUpPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        isAdmin: false
    })
    const [errors, setErrors] = useState({})

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

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
            .email('Email введен некорректно'),
        name: yup.string().required('Имя обязательно для заполнения')
    })
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
        const newData = {
            ...data
        }
        dispatch(signUp(newData))
        navigate('/')
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Регистрация</h2>
            <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
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
            <RadioField
                options={[
                    { name: 'Мужской', value: 'Мужской' },
                    { name: 'Женский', value: 'Женский' }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите ваш пол"
            />
            <button
                className="btn btn-primary w-100 mx-auto mt-4"
                type="submit"
                disabled={!isValid}
            >
                Регистрация
            </button>
            <p className="mt-2">
                Уже есть аккаунт? <Link to="/auth/login">Войти!</Link>
            </p>
        </form>
    )
}

export default SignUpPage
