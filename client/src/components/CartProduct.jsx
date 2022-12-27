import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getProductById } from '../store/products'
import ProductsCounter from './ProductsCounter'

const CartProduct = ({ cartProduct, onRemove, ...rest }) => {
    const product = useSelector(getProductById(cartProduct.productId))

    if (product) {
        return (
            <div className="card shadow" key={cartProduct._id}>
                <button
                    className="position-absolute top-0 end-0 btn btn-danger btn-sm m-1"
                    onClick={() => onRemove(cartProduct._id)}
                >
                    <i className="bi bi-x-circle"></i>
                </button>
                <div className="row g-0">
                    <div className="col-12 col-md-6 col-lg-4 m-auto">
                        <img
                            className="card-img img-fluid bg-light"
                            src={product.image}
                            alt={product.name}
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-5 d-flex align-items-center bg-secondary">
                        <div className="card-body">
                            <ul className="list-group">
                                <li className="list-group-item text-center bg-light">
                                    <h3 className="card-title m-3">
                                        {product.name}
                                    </h3>
                                </li>
                                <li className="list-group-item bg-light">
                                    <p>
                                        <strong>АРТИКУЛ:</strong> {product._id}
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-12 col-md-12 col-lg-3 d-flex align-items-center bg-light">
                        <div className="card-body text-center">
                            <ProductsCounter
                                product={cartProduct.quantity}
                                cartProduct={cartProduct}
                                {...rest}
                            />
                            <h5 className="card-title m-3">
                                Количество: {cartProduct.quantity}
                            </h5>
                            <h5 className="card-title m-2">
                                Стоимость:{' '}
                                {product.price * cartProduct.quantity} ₽
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
CartProduct.propTypes = {
    cartProduct: PropTypes.object,
    onRemove: PropTypes.func
}

export default CartProduct
