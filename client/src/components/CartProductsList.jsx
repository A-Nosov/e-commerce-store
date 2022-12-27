import React from 'react'
import PropTypes from 'prop-types'
import CartProduct from './CartProduct'

const CartProductsList = ({ products, ...rest }) => {
    return (
        <>
            {products.map((product) => (
                <CartProduct
                    cartProduct={product}
                    key={product._id}
                    {...rest}
                />
            ))}
        </>
    )
}
CartProductsList.propTypes = {
    products: PropTypes.array
}

export default CartProductsList
