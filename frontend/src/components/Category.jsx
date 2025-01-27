import React from 'react'
import { Link } from 'react-router-dom';

const Category = ({ category }) => {
    return (





        <div className="category" key={category.name}>
            <Link to={`/category${category.href}`} className="categoryLink">
                <div className="categoryImageContainer">
                    <img
                        className="categoryImage"
                        src={category.imageUrl}
                        alt={category.name}
                    />
                </div>
                <div className="categoryNameContainer">
                    <p className="categoryName">{category.name}</p>
                </div>
            </Link>
        </div>

    )
}

export default Category