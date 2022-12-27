import React from 'react'
import PropTypes from 'prop-types'

const ProductsCounter = ({ cartProduct, onIncrement, onDecrement }) => {
    const handleIncrement = () => {
        onIncrement(cartProduct._id)
    }
    const handleDecrement = () => {
        onDecrement(cartProduct._id)
    }

    return (
        <div className="d-flex align-items-center justify-content-center mt-2">
            <button
                className="btn btn-success btn-sm"
                onClick={() => handleDecrement()}
            >
                <i className="bi bi-dash-circle" />
            </button>

            <span
                className="m-3"
                style={{
                    fontSize: 25
                }}
            >
                {cartProduct.quantity}
            </span>

            <button
                className="btn btn-success btn-sm"
                onClick={() => handleIncrement()}
            >
                <i className="bi bi-plus-circle" />
            </button>
        </div>
    )
}
ProductsCounter.propTypes = {
    cartProduct: PropTypes.object,
    onIncrement: PropTypes.func,
    onDecrement: PropTypes.func
}

export default ProductsCounter
