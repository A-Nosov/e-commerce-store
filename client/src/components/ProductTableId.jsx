import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getProductsList, getProductsLoadingStatus } from '../store/products'

const ProductTableId = ({ id }) => {
    const isLoading = useSelector(getProductsLoadingStatus())
    const products = useSelector(getProductsList())

    function findProductTableId(products, id) {
        for (let i = 0; i < products.length; i++) {
            if (products[i]._id === id) return i + 1
        }
    }

    const productTableId = findProductTableId(products, id)

    if (!isLoading) {
        return <span>{productTableId}</span>
    } else return 'loading ...'
}

ProductTableId.propTypes = {
    id: PropTypes.string
}

export default ProductTableId
