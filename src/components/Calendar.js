import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import TrainingList from './TrainingList';

const localizer = BigCalendar.momentLocalizer(moment)

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
        .then(jsondata => this.setState({trainings: jsondata}))
        .catch(err => console.error(err));
        this.newEvents();
    }

    newEvents = () => {
        var trainings = this.state.trainings;
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
        return (
            <div>
                <BigCalendar
                    localizer={localizer}
                    events={this.state.events}
                    startAccessor="start"
                    endAccessor="end"
                    views={["month", "week", "day"]}
                />
            </div>
        );
    }
}

export default calendar;