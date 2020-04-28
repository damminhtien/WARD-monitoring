import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
 
class DatePicker extends Component {
  render() {
    return (
      <div>
        <DateTimePicker
          onChange={this.props.onChange}
          value={this.props.date}
        />
      </div>
    );
  }
}

export default DatePicker;
