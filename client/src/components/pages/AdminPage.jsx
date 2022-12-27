import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProductsList } from '../../store/products'
import Pagination from '../Pagination'
import { paginate } from '../../utils/paginate'
import ProductTable from '../ProductTable'

const AdminPage = () => {
    const products = useSelector(getProductsList())
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 8

    const handleSearchQuery = ({ target }) => {
        setSearchQuery(target.value)
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    useEffect(() => {
        setCurrentPage(1)
    }, [products])

    if (products) {
        const searchedProducts = products.filter(
            (product) =>
                product.name
                    .toLowerCase()
                    .indexOf(searchQuery.toLowerCase()) !== -1
        )
        const count = searchedProducts.length
        const usersCrop = paginate(searchedProducts, currentPage, pageSize)

        return (
            <div className="container">
                <div className="row m-2">
                    <div className="col-12">
                        <div className="input-group mb-2">
                            <input
                                className="form-control w-50"
                                type="text"
                                name="searchQuery"
                                placeholder="Поиск..."
                                onChange={handleSearchQuery}
                                value={searchQuery}
                            />
                            <span className="input-group-text">
                                <i className="bi bi-search"></i>
                            </span>
                        </div>
                    </div>
                    <div className="col-12">
                        <ProductTable products={usersCrop} />
                    </div>
                    <div className="col-12 d-flex justify-content-end">
                        <Link to="/addProduct" className="btn btn-primary mt-4">
                            Добавить продукт
                        </Link>
                    </div>
                    <div className="col-12">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminPage
