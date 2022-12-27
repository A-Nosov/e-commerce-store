import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const MainProductCard = ({ product }) => {
    return (
        <div className="card shadow text-center" style={{ width: 280 }}>
            <Link to={`products/${product._id}`}>
                <img
                    src={product.image}
                    className="card-img-top bg-light"
                    alt={product.name}
                />
            </Link>
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
            </div>
            <div className="card-footer">
                <Link
                    to={`products/${product._id}`}
                    className="btn btn-primary w-50"
                >
                    {product.price} ₽
                </Link>
            </div>
        </div>
    )
}
MainProductCard.propTypes = {
    product: PropTypes.object,
    description: PropTypes.string
}

export default MainProductCard
