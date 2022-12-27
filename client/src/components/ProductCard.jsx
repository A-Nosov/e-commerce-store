import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getBrandById } from '../store/brands'
import useHover from './hooks/useHover'

const ProductCard = ({ product }) => {
    const imageRef = useRef()
    const hovered = useHover(imageRef)

    const brand = useSelector(getBrandById(product.brand))

    if (brand) {
        return (
            <div className="card shadow">
                <div className="row g-0">
                    <div className="col-12 col-md-7 col-lg-5 m-auto">
                        <img
                            ref={imageRef}
                            style={{
                                height: '100%',
                                width: '100%',
                                transition: 'all 1.5s',
                                transform: hovered ? 'scale(1.3)' : 'scale(1)'
                            }}
                            src={product.image}
                            alt={product.name}
                        />
                    </div>
                    <div className="col d-flex align-items-center bg-secondary">
                        <div className="card-body">
                            <ul className="list-group">
                                <li className="list-group-item text-center bg-light">
                                    <img
                                        src={brand.image}
                                        style={{ width: 80 }}
                                        className="card-img-top"
                                        alt={brand.name}
                                    />
                                </li>
                                <li className="list-group-item bg-light">
                                    <h5 className="card-title m-3">
                                        Бренд: <strong>{brand.name}</strong>
                                    </h5>
                                </li>
                                <li className="list-group-item bg-light">
                                    <h5 className="card-title m-3">
                                        Цена: <strong>{product.price} ₽</strong>
                                    </h5>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-12">
                        <p className="m-2">
                            <strong>Описание: </strong>
                            {product.description}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
ProductCard.propTypes = {
    product: PropTypes.object,
    description: PropTypes.string
}

export default ProductCard
