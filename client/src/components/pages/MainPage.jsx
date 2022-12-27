import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getBrandsList, getBrandsLoadingStatus } from '../../store/brands'
import { getProductsList, getProductsLoadingStatus } from '../../store/products'
import CategoriesBar from '../CategoriesBar'
import CheckBoxField from '../form/CheckBoxField'
import SelectField from '../form/SelectField'
import _ from 'lodash'
import ProductsList from '../ProductsList'

const MainPage = () => {
    const products = useSelector(getProductsList())
    const productsLoadingStatus = useSelector(getProductsLoadingStatus())
    const brands = useSelector(getBrandsList())
    const brandsLoadingStatus = useSelector(getBrandsLoadingStatus())
    const [selectedBrand, setSelectedBrand] = useState()
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedGender, setSelectedGender] = useState({
        male: false,
        female: false
    })
    const [sortBy, setSortBy] = useState({
        iter: 'price',
        order: ''
    })

    const handleBrandSelect = (item) => {
        if (searchQuery !== '') setSearchQuery('')
        setSelectedBrand(item)
    }
    const handleSearchQuery = ({ target }) => {
        setSelectedBrand(undefined)
        setSearchQuery(target.value)
    }
    const handleChangeGender = (target) => {
        setSelectedGender((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }
    const handleChangeSortBy = (target) => {
        setSortBy((prevState) => ({
            ...prevState,
            order: target.value
        }))
    }

    function filterProducts(data) {
        const filteredProducts = selectedBrand
            ? data.filter((product) => product.brand === selectedBrand._id)
            : searchQuery
            ? data.filter(
                  (product) =>
                      product.name
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) !== -1
              )
            : data
        return filteredProducts?.filter((product) =>
            selectedGender.male && selectedGender.female
                ? product
                : selectedGender.male
                ? product.category === 'Мужское'
                : selectedGender.female
                ? product.category === 'Женское'
                : product
        )
    }
    const clearFilter = () => {
        setSelectedBrand()
        setSelectedGender({ male: false, female: false })
        setSearchQuery('')
    }

    const filteredProducts = filterProducts(products)
    const sortedProducts = sortBy.order
        ? _.orderBy(filteredProducts, [sortBy.iter], [sortBy.order])
        : filteredProducts

    return (
        <div className="container my-2">
            {!productsLoadingStatus && !brandsLoadingStatus && (
                <div className="row">
                    <div className="col-md-3">
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
                        <CategoriesBar
                            selectedItem={selectedBrand}
                            items={brands}
                            onItemSelect={handleBrandSelect}
                        />
                        <CheckBoxField
                            value={selectedGender.male}
                            onChange={handleChangeGender}
                            name="male"
                        >
                            Мужское
                        </CheckBoxField>
                        <CheckBoxField
                            value={selectedGender.female}
                            onChange={handleChangeGender}
                            name="female"
                        >
                            Женское
                        </CheckBoxField>
                        <button
                            className="btn btn-primary w-100 my-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                    <div className="col-md-9">
                        <div className="d-flex justify-content-end">
                            <SelectField
                                defaultOption="Сортировать по"
                                name="sortBy"
                                options={[
                                    {
                                        label: 'Цена, по возрастанию',
                                        value: 'asc'
                                    },
                                    {
                                        label: 'Цена, по убыванию',
                                        value: 'desc'
                                    },
                                    {
                                        label: 'Умолчанию',
                                        value: ''
                                    }
                                ]}
                                onChange={handleChangeSortBy}
                                value={sortBy.order}
                            />
                        </div>
                        <ProductsList products={sortedProducts} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default MainPage
