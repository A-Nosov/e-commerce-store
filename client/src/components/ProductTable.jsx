import React from 'react'
import PropTypes from 'prop-types'
import Table from './table'
import Brand from './Brand'
import { Link } from 'react-router-dom'
import ProductTableId from './ProductTableId'
import ActionsTable from './ActionsTable'

const ProductTable = ({ products }) => {
    const columns = {
        id: {
            name: 'id',
            component: (product) => <ProductTableId id={product._id} />
        },
        name: {
            name: 'Имя',
            component: (product) => (
                <Link className="link-dark" to={`/products/${product._id}`}>
                    {product.name}
                </Link>
            )
        },
        brand: {
            name: 'Бренд',
            component: (product) => <Brand id={product.brand} />
        },
        category: {
            path: 'category',
            name: 'Категория'
        },
        price: {
            path: 'price',
            name: 'Стоимость'
        },
        image: {
            name: 'Фото',
            component: (product) => (
                <a
                    href={product.image}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {product.image}
                </a>
            )
        },
        actions: {
            name: 'Действия',
            component: (product) => <ActionsTable id={product._id} />
        }
    }

    return <Table columns={columns} data={products} />
}
ProductTable.propTypes = {
    products: PropTypes.array.isRequired
}

export default ProductTable
