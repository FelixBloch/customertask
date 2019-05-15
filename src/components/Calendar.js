import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';

class calendar extends Component {
    constructor(props){
        super(props);
        this.state = {trainings: [], events: []};
    }

    componentDidMount() {
        this.getTrainings();
    }

    getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(jsondata => {
            this.setState({trainings: jsondata});
            this.newEvents()
        })
        .catch(err => console.error(err));
    }

    newEvents = () => {
        var trainings = this.state.trainings;
        trainings = Object.values(trainings);
        var events = [];
        var starting;
        var ending;
        
        for(var i = 0; i < trainings.length; i++){
            starting = new Date(trainings[i].date);
            ending = new Date(trainings[i].date);
            ending = ending.setUTCMinutes(starting.getUTCMinutes() + trainings[i].duration);

            if(trainings[i].customer != null){
                events[i] ={
                    start: starting,
                    end: ending,
                    title: 'Customer: '+  trainings[i].customer.firstname + ' ' + trainings[i].customer.lastname + ', Activity: ' + trainings[i].activity + ', Duration: ' + trainings[i].duration
                }
            }
        }
        this.setState({events: [...events]});

    }

    render() {
        const localizer = BigCalendar.momentLocalizer(moment);

        return (
            <div>
                <BigCalendar
                    localizer={localizer}
                    events={this.state.events}
                    startAccessor="start"
                    endAccessor="end"
                    views={["month", "week", "day"]}
                    style={{height: 500, width: this.state.width}}
                />
            </div>
        );
    }
}

export default calendar;