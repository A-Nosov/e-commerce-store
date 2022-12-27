import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getSizesList } from '../store/size'
import SelectField from './form/SelectField'

export const AddToCartFrom = ({ product, onSubmit }) => {
    const sizes = useSelector(getSizesList())
    const [data, setData] = useState({
        size: ''
    })
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(data.size)
    }
    if (sizes) {
        const sizesList = sizes.map((s) => ({ label: s.size, value: s.size }))
        return (
            <form onSubmit={handleSubmit}>
                <div className="card d-flex flex-column align-items-center justify-content-around bg-light">
                    <h3 className="card-title text-center m-3">
                        {product.name}
                    </h3>
                    <div className="card-body">
                        <SelectField
                            label="Выберите размер"
                            defaultOption="EU"
                            name="size"
                            options={sizesList}
                            onChange={handleChange}
                            value={data.size}
                        />
                    </div>
                    <button
                        className="btn btn-secondary mb-2 mt-2"
                        type="submit"
                        disabled={!data.size}
                    >
                        Добавить в корзину
                    </button>
                </div>
            </form>
        )
    }
}
AddToCartFrom.propTypes = {
    product: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired
}

export default AddToCartFrom
