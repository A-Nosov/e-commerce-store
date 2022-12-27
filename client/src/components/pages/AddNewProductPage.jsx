import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '../form/TextField'
import SelectField from '../form/SelectField'
import { getBrandsList, getBrandsLoadingStatus } from '../../store/brands'
import { createProduct } from '../../store/products'
import { useNavigate } from 'react-router-dom'
import TextAreaField from '../form/TextAreaField'

const AddNewProductForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [data, setData] = useState({
        name: '',
        image: '',
        brand: '',
        category: '',
        description: '',
        price: `${0}`
    })
    const [errors, setErrors] = useState({})

    const brands = useSelector(getBrandsList())
    const brandsLoadingStatus = useSelector(getBrandsLoadingStatus())

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const validateScheme = yup.object().shape({
        description: yup.string().required('Заполните описание'),
        category: yup.string().required('Выберите категорию'),
        brand: yup.string().required('Выберите бренд'),
        image: yup
            .string()
            .url('Заполните правильный URL')
            .required('Заполните URL'),
        name: yup.string().required('Заполните название')
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
        dispatch(createProduct(newData))
        navigate('/admin')
    }

    if (!brandsLoadingStatus) {
        const brandsList = brands.map((b) => ({
            label: b.name,
            value: b._id
        }))
        return (
            <div className="container d-flex justify-content-center align-items-center">
                <div className="card mt-5 p-3" style={{ width: 400 }}>
                    <form onSubmit={handleSubmit}>
                        <h2>Создание продукта</h2>
                        <TextField
                            label="Название"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <TextField
                            label="Фото"
                            name="image"
                            value={data.image}
                            onChange={handleChange}
                            error={errors.image}
                        />
                        <SelectField
                            label="Выберите бренд"
                            defaultOption="Бренд"
                            name="brand"
                            options={brandsList}
                            onChange={handleChange}
                            value={data.brand}
                            error={errors.brand}
                        />
                        <SelectField
                            label="Выберите категорию"
                            defaultOption="Категория"
                            name="category"
                            options={[
                                { label: 'Мужское', value: 'Мужское' },
                                { label: 'Женское', value: 'Женское' }
                            ]}
                            onChange={handleChange}
                            value={data.category}
                            error={errors.category}
                        />
                        <TextAreaField
                            label="Описание"
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            error={errors.description}
                        />
                        <TextField
                            label="Цена"
                            type="number"
                            name="price"
                            value={data.price}
                            onChange={handleChange}
                            error={errors.price}
                        />
                        <button
                            className="btn btn-primary w-100 mx-auto"
                            type="submit"
                            disabled={!isValid}
                        >
                            Создать
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddNewProductForm
