import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { createCartProduct } from '../../store/cartProduct'
import { getProductById, getProductsLoadingStatus } from '../../store/products'
import { getUserData } from '../../store/users'
import AddToCartFrom from '../AddToCartFrom'
import Loader from '../loader/Loader'
import ProductCard from '../ProductCard'

const ProductPage = () => {
    const { productId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(getUserData())
    const product = useSelector(getProductById(productId))
    const productsLoadingStatus = useSelector(getProductsLoadingStatus())

    const handleSubmit = (data) => {
        dispatch(
            createCartProduct({
                userId: user._id,
                productId: product._id,
                size: data
            })
        )
        navigate('/')
    }
    return (
        <div className="container mt-2">
            {product && !productsLoadingStatus ? (
                <div className="row g-2">
                    <div className="col d-flex justify-content-center">
                        <ProductCard product={product} />
                    </div>
                    {user && (
                        <div className="col-12 col-lg-3">
                            <AddToCartFrom
                                onSubmit={handleSubmit}
                                product={product}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <Loader />
            )}
        </div>
    )
}

export default ProductPage
