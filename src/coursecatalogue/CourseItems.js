import React from 'react';
import Avatar from '../images/HSR.jpg';

function CourseItems(props) {
    return (
        <div>
            {(props.courses && props.courses.length) ? props.courses.map((course) => (
            <div className="course-card" key={course.TemplateID}>
                <img className="course-avatar" alt={course.Name} src={Avatar}>
                </img>
                <div className="course-description">
                    <div className="course-category">
                        {course.Categories ? course.Categories.map((category) => (
                            <label key={category.CategoryID}>
                                {category.Name}
                            </label>
                        )) : ''}
                    </div>
                    <div className="course-title">
                        {course.Name}
                    </div>
                    <div className="course-overview">
                        {course.Description.Summary}
                    </div>
                    <div className="course-card-bottom">
                        <div className="course-tags">
                            {course.Tags ? course.Tags.map((tag) => (
                                <label key={tag}>
                                    {tag}
                                </label>
                            )): ''}
                        </div>
                        <div className="course-button">
                            <a href={course.ViewUri}>
                                <button className="learn-more-button">
                                Learn More
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            )
        ) : (<div className="no-results">
            No results, please try other filter conditions
        </div>)}
        </div>
    );
}

export default CourseItems;