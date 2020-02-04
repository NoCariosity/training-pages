import React from 'react';
import CategoryItems from './CategoryItems';
import CourseSearch from './CourseSearch';
import CourseItems from './CourseItems';
import GeneralFilter from './GeneralFilter';
import CalendarFilter from './CalendarFilter';
import * as DataAPI from '../utils/DataAPI';

import 'bootstrap/dist/css/bootstrap.min.css';
import Fuse from 'fuse.js';

class CourseCatalogue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [], 
            regions: [],
            allCourses: [],
            currentCourses: [],
            filters: {
                category: 'all',
                region: 'all',
                from: new Date('January 28, 2022'),
                to: new Date('June 30, 2023')
            },
            searchValue: ''
        };

        this.handleCategoryItemClick = this.handleCategoryItemClick.bind(this);
        this.handleRegionFilter = this.handleRegionFilter.bind(this);
        this.handleDateFilter = this.handleDateFilter.bind(this);
        this.handleMobileCategoryItemClick = this.handleMobileCategoryItemClick.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        this.handleFirstRender();
    }

    async handleFirstRender(){
        let regions = [], categories = [], courses = [];
        // fetch the filter data
        let filtersData = await DataAPI.getRegionsAndCategories();
        const facets = filtersData.Facets;
        for(let facet of facets){
            if(facet.Name === 'State'){
                for(let item of facet.Values){
                    regions.push({label: item.Label, value: item.Code});
                }
            }
            else if(facet.Name === 'Category'){
                for(let item of facet.Values){
                    categories.push({label: item.Label, value: item.Code, Selected: false})
                }
            }
        }
        regions.unshift({label: 'All Locations', value: 'all'});
        categories.unshift({label: 'All Category', value: 'all', Selected: true});
        // fetch course data
        let coursesData = await DataAPI.getAllCourses();
        courses = coursesData.Items;
        this.setState({
            regions,
            categories,
            currentCourses: courses,
            allCourses: courses
        });
    }

    handleCategoryItemClick(categoryID){
        const {region, from, to} = this.state.filters;
        const filters = Object.assign({}, {category: categoryID}, {region}, {from}, {to});
        // render the catgory item to have blue bg color
        const categories = this.state.categories.map((category) => {
            category.Selected = false;
            if(categoryID.toString() === category.value.toString()) category.Selected = true;
            return category;
        });
        this.handleFilters(filters, categories);
    }

    handleMobileCategoryItemClick(selectedCategory){
        const {region, from, to} = this.state.filters;
        const filters = Object.assign({}, {category: selectedCategory.value}, {region}, {from}, {to});
        this.handleFilters(filters);
    }

    handleRegionFilter(selectedRegion) {
        const {category, from, to} = this.state.filters;
        const filters = Object.assign({}, {category}, {region: selectedRegion.value}, {from}, {to});
        this.handleFilters(filters);
    }

    handleDateFilter(date) {
        const current = new Date();
        let start = current, end = current;
        const {category, region, from, to} = this.state.filters;
        if(date.from){
            if(date.from > current){
                start = date.from;
            }
            const filters = Object.assign({}, {category}, {region}, {from: start}, {to});
            this.handleFilters(filters);
        } else {
            if(date.to < start){
                alert("The end date should not be earlier than the start date or today, please reselect the date range!");
            }else{
                end = date.to;
                const filters = Object.assign({}, {category}, {region}, {from}, {to: end});
                this.handleFilters(filters);
            }
        }
    }
    
    async handleFilters(filters, categories){
        let courseFacets = await DataAPI.getCourseIDs(filters).then(data => data.Facets[0].Values);
        let codes = [], courses = [];
        for(let course of courseFacets){
            codes.push(course.Code);
        }
        if(codes.length > 0){
            const data = await DataAPI.getCourses(codes);
            courses = data.Items;
        }
        if(categories){
            this.setState({
                categories,
                filters,
                currentCourses: courses,
                allCourses: courses,
            });
        }else{
            this.setState({
                filters,
                currentCourses: courses,
                allCourses: courses,
            });
        }
    }

    handleSearch(event) {
        if(event.target.value === ''){
            this.setState((prevState) => {
                return {
                    searchValue: '',
                    currentCourses: prevState.allCourses
                }
            });
        } else {
            let options = {
                shouldSort: true,
                threshold: 0.6,
                location: 0,
                distance: 100,
                maxPatternLength: 32,
                minMatchCharLength: 1,
                keys: [
                    "Name",
                    "Categories.Name",
                    "Description.Summary"
                ]
            };
            let fuse = new Fuse(this.state.allCourses, options);
            let result = fuse.search(event.target.value);
            this.setState({
                searchValue: event.target.value,
                currentCourses: result
            });
        }
    }

    render() {
        return(
            <div className='impac-course-catelogue'>
                <CategoryItems categories={this.state.categories} handleClick={this.handleCategoryItemClick}/>
                <CourseSearch searchValue={this.state.searchValue} handleChange={this.handleSearch} />
                <div className="filters-courses-section">
                    <div className="filters-section-mobile">
                        <GeneralFilter options={this.state.categories} handleClick={this.handleMobileCategoryItemClick}/>
                        <GeneralFilter options={this.state.regions} handleClick={this.handleRegionFilter}/>
                        <CalendarFilter label="from" handleChange={this.handleDateFilter} date={this.state.filters.from}/>
                        <CalendarFilter label="to" handleChange={this.handleDateFilter} date={this.state.filters.to}/>
                    </div>
                    <div className="filters-section">
                        <GeneralFilter options={this.state.regions} handleClick={this.handleRegionFilter}/>
                        <CalendarFilter label="from" handleChange={this.handleDateFilter} date={this.state.filters.from}/>
                        <CalendarFilter label="to" handleChange={this.handleDateFilter} date={this.state.filters.to}/>
                    </div>
                    <div className="courses-setion">
                        <CourseItems courses={this.state.currentCourses} />
                    </div>
                </div>
            </div>
        );
    }
}

export default CourseCatalogue;