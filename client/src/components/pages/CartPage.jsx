import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getCartProducts,
    removeCartProduct,
    updateCartProduct
} from '../../store/cartProduct'
import { getProductsList } from '../../store/products'
import CartProductsList from '../CartProductsList'

const CartPage = () => {
    const dispatch = useDispatch()
    const products = useSelector(getProductsList())
    const cartProducts = useSelector(getCartProducts())
    const [cart, setCart] = useState([])
    useEffect(() => {
        setCart(cartProducts)
    }, [cartProducts])

    function getProductsPriceList(cartProductsList) {
        const priceArray = []
        for (const cartProduct of cartProductsList) {
            for (const product of products) {
                if (product._id === cartProduct.productId) {
                    priceArray.push(product.price * cartProduct.quantity)
                    break
                }
            }
        }
        return priceArray
    }
    const productsPriceList = getProductsPriceList(cart)
    const totalAmount = productsPriceList.reduce((sum, price) => sum + price, 0)

    const handleRemoveCartProduct = (id) => {
        dispatch(removeCartProduct(id))
    }
    const handleIncrement = (id) => {
        const changedCartProduct = cart.map((cartProduct) => {
            const changedProduct = { ...cartProduct }
            if (changedProduct._id === id) {
                changedProduct.quantity += 1
                dispatch(updateCartProduct(id, changedProduct))
            }
            return changedProduct
        })
        setCart([...changedCartProduct])
    }
    const handleDecrement = (id) => {
        const changedCartProduct = cart.map((cartProduct) => {
            const changedProduct = { ...cartProduct }
            if (changedProduct._id === id) {
                changedProduct.quantity -= 1
                if (changedProduct.quantity === 0) {
                    dispatch(removeCartProduct(id))
                }
                dispatch(updateCartProduct(id, changedProduct))
            }
            return changedProduct
        })
        setCart([...changedCartProduct])
    }
    if (cart) {
        return (
            <div className="container mt-2">
                <div className="row g-2">
                    <div className="col-12 col-lg-9">
                        <CartProductsList
                            products={cart}
                            onRemove={handleRemoveCartProduct}
                            onIncrement={handleIncrement}
                            onDecrement={handleDecrement}
                        />
                    </div>
                    <div className="col-12 col-lg-3">
                        <form>
                            <div className="card d-flex flex-column align-items-center justify-content-around bg-light">
                                <h3 className="card-title text-center m-3">
                                    Итоговая сумма: {totalAmount} ₽
                                </h3>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default CartPage
