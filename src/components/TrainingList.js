import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import * as moment from 'moment';
import AddTraining from './AddTraining';
import Button from '@material-ui/core/Button';

class TrainingList extends Component {
    constructor(props){
        super(props);
        this.state = {trainings: [], open: false, message: ''}
    }

    componentDidMount(){
        this.loadTrainings();
    }

    loadTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(jsondata => this.setState({trainings: jsondata}))
        .catch(err => console.error(err));
    }

    saveTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/gettrainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(res => this.loadTrainings())
        .then(res => this.setState({open: true, message: 'New training added'}))
        .catch(err => console.error(err));
    }

    updateTraining = (link, updatedTraining) => {
        console.log(link)
        link = "https://customerrest.herokuapp.com/api/trainings/" + link
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTraining)
        })
        .then(res => this.loadTrainings())
        .then(res => this.setState({open: true, message: 'Training updated'}))
        .catch(err => console.error(err));
    }

    deleteTraining = (trainingLink) => {
        trainingLink = "https://customerrest.herokuapp.com/api/trainings/" + trainingLink
        if (window.confirm("Are you sure?")) {
            fetch(trainingLink, {method: 'DELETE'})
            .then(res => this.loadTrainings())
            .then(res => this.setState({open: true, message: 'Training deleted'}))
            .catch(err => console.error(err))
        }
    };

    render() {
        const columns = [
            {
                Header: "Date",
                id: "date",
                accessor: (i) => {
                    return moment(i.date).format("MMM Do YY, h:mm a")
                }
                
            },{
                Header: "Duration",
                accessor: "duration"
            },{
                Header: "Activity",
                accessor: "activity"
            },{
                Header: "Customer",
                accessor: "customer",
                Cell : ({value}) => {
                    return (
                        <div>
                            <span className="firstName">{value.firstname} </span>
                            <span className="lastName">{value.lastname}</span>
                        </div>
                    )
                }
            },{
                Header: "Customer E-Mail",
                accessor: "customer.email"
            },{
                Header: "",
                filterable: false,
                sortable: false,
                width: 100,
                accessor: "id",
                Cell: ({value}) => (
                    <Button color="secondary" onClick={() => this.deleteTraining(value)}>Delete</Button>
                )
            }]

        return (
            <div>
                <AddTraining saveTraining={this.saveTraining} />
                <ReactTable data={this.state.trainings} columns={columns} filterable={true} />
            </div>
        );
    }
}

export default TrainingList;