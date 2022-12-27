import React from 'react'
import PropTypes from 'prop-types'

const CategoriesBar = ({ items, onItemSelect, selectedItem }) => {
    return (
        <ul className="list-group mb-2">
            {items.map((item) => (
                <li
                    key={item._id}
                    className={
                        'list-group-item' +
                        (item === selectedItem ? ' active' : '')
                    }
                    onClick={() => onItemSelect(item)}
                    role="button"
                >
                    {item.name}
                </li>
            ))}
        </ul>
    )
}

CategoriesBar.propTypes = {
    items: PropTypes.array,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object
}

export default CategoriesBar
