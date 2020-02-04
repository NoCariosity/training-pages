import React from 'react';

function CategoryItems(props) {
    return (
        <div className="categories">
            {props.categories.map((category) => (
                    <div
                        className={`category-item ${category.Selected ? 'selected' : ''}`}
                        onClick={() => props.handleClick(category.value)}
                        key={category.value}
                    >
                        {category.label}
                    </div>
                )
            )}
        </div>
    );
}

export default CategoryItems;