import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import TrainingList from './TrainingList';

const localizer = BigCalendar.momentLocalizer(moment)

class calendar extends Component {
    render() {
        return (
            <div>
                <BigCalendar
                    localizer={localizer}
                    events={TrainingList}
                    startAccessor="start"
                    endAccessor="end"
                />
            </div>
        );
    }
}

export default calendar;