import React from 'react';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

class CalendarFilter extends React.Component {
    render() {
        return (
            <div className="calendar-filter">
                <div className="calendar d-flex justify-content-between align-middle">
                    <label>{this.props.label}</label>
                    <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={this.props.date}
                        onChange={(date) => this.props.handleChange({[this.props.label]: date})}
                    />
                </div>
            </div>
        );
    }
}

export default CalendarFilter;