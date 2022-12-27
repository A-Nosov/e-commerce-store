import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '../form/TextField'
import SelectField from '../form/SelectField'
import { getBrandsList, getBrandsLoadingStatus } from '../../store/brands'
import { getProductById, updateProduct } from '../../store/products'
import { useNavigate, useParams } from 'react-router-dom'
import TextAreaField from '../form/TextAreaField'

const EditProductForm = () => {
    const { productId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentProduct = useSelector(getProductById(productId))
    const [data, setData] = useState()
    const [errors, setErrors] = useState({})
    const brands = useSelector(getBrandsList())
    const brandsLoadingStatus = useSelector(getBrandsLoadingStatus())

    useEffect(() => {
        if (currentProduct && !brandsLoadingStatus && !data) {
            setData({
                ...currentProduct,
                price: `${currentProduct.price}`
            })
        }
    }, [currentProduct, brandsLoadingStatus, data])

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
            ...data,
            price: Number(data.price)
        }
        dispatch(updateProduct(productId, newData))
        navigate('/admin')
    }

    if (data && !brandsLoadingStatus) {
        const brandsList = brands.map((b) => ({
            label: b.name,
            value: b._id
        }))
        return (
            <div className="container d-flex justify-content-center align-items-center">
                <div className="card mt-5 p-3" style={{ width: 400 }}>
                    <form onSubmit={handleSubmit}>
                        <h2>Обновление продукта</h2>
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
                            Обновить
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default EditProductForm
