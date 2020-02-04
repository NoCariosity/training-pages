import React from 'react';
import SearchIcon from '../icons/search.svg';

class CourseSearch extends React.Component {
    render() {
        return (
            <div className="search-bar-wrap">
                <input
                    className="search-bar"
                    value={this.props.searchValue}
                    onChange={this.props.handleChange}    // need to be lifted up to CourseCatalogue
                    placeholder="Search"
                />
                <img className="search-icon" alt="search" src={SearchIcon}>
                </img>
            </div>
        );
    }
}

export default CourseSearch;