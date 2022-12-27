import React from 'react'
import PropTypes from 'prop-types'
import MainProductCard from './MainProductCard'

const ProductsList = ({ products }) => {
    return (
        <div className="row g-3">
            {products.map((product) => (
                <div
                    className="col col-sm-6 col-md-6 col-lg-4 d-flex justify-content-center"
                    key={product._id}
                >
                    <MainProductCard product={product} />
                </div>
            ))}
        </div>
    )
}
ProductsList.propTypes = {
    products: PropTypes.array.isRequired
}

export default ProductsList
