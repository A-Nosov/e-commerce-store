import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { removeProduct } from '../store/products'
import { useNavigate } from 'react-router-dom'

const ActionsTable = ({ id }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleEdit = () => {
        navigate(`/editProduct/${id}`)
    }
    const handleDelete = () => {
        dispatch(removeProduct(id))
    }

    return (
        <div className="btn-group" role="group" aria-label="Basic example">
            <button
                onClick={handleEdit}
                type="button"
                className="btn btn-outline-secondary"
            >
                <i className="bi bi-pencil"></i>
            </button>
            <button
                onClick={handleDelete}
                type="button"
                className="btn btn-outline-secondary"
            >
                <i className="bi bi-trash3"></i>
            </button>
        </div>
    )
}
ActionsTable.propTypes = {
    id: PropTypes.string.isRequired
}

export default ActionsTable
