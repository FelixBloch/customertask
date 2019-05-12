import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import Button from '@material-ui/core/Button';

class CustomerList extends Component {
    constructor(props){
        super(props);
        this.state = {customers: []}
    }
    
    componentDidMount(){
        this.loadCustomers();
    }

    loadCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(jsondata => this.setState({customers: jsondata.content}))
        .catch(err => console.error(err));
        console.log(this.state.customers);
    }

    saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => this.loadCustomers())
        .then(res => this.setState({open: true, message: 'New customer added'}))
        .catch(err => console.error(err));
    }

    updateCustomer = (link, updatedCustomer) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedCustomer)
        })
        .then(res => this.loadCustomers())
        .then(res => this.setState({open: true, message: 'Customer updated'}))
        .catch(err => console.error(err));
    }

    deleteCustomer = (customerLink) => {
        if (window.confirm("Are you sure?")) {
            fetch(customerLink, {method: 'DELETE'})
            .then(res => this.loadCustomers())
            .then(res => this.setState({open: true, message: 'Customer deleted'}))
            .catch(err => console.error(err))
        }
    };

    render() {
        const columns = [
            {
                Header: "First Name",
                accessor: "firstname"
            },{
                Header: "Last Name",
                accessor: "lastname"
            },{
                Header: "Street Address",
                accessor: "streetaddress"
            },{
                Header: "Post Code",
                accessor: "postcode"
            },{
                Header: "City",
                accessor: "city"
            },{
                Header: "E-Mail",
                accessor: "email"
            },{
                Header: "Phone",
                accessor: "phone"
            },{
                Header: "",
                filterable: false,
                sortable: false,
                width: 100,
                accessor: "links[0].href",
                Cell: ({value, row}) => (
                    <EditCustomer updateCustomer={this.updateCustomer} link={value} customer={row} />
                )
            },{
                Header: "",
                filterable: false,
                sortable: false,
                width: 100,
                accessor: "links[0].href",
                Cell: ({value}) => (
                    <Button color="secondary" onClick={() => this.deleteCustomer(value)}>Delete</Button>
                )
            }]

        return (
            <div>
                <AddCustomer saveCustomer={this.saveCustomer} />
                <ReactTable data={this.state.customers} columns={columns} filterable={true} />
            </div>
        );
    }
}

export default CustomerList;