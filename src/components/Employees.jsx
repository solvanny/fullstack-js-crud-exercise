import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table/Table";
import Pagination from "./pagination/Pagination";

class Employees extends Component {
  state = {
    employees: [],
    pagination: []
  };

  //Delete employeer by Id & update the state
  handleDelite = async id => {
    await fetch(`http://localhost:8080/api/employees/${id}`, {
      method: "delete"
    }).then(async () => {
      await fetch(`http://localhost:8080/api/employees/`, {
        method: "get"
      })
        .then(response => response.json())
        .then(employees => {
          this.setState({ ...employees });
        });
    });
  };

  //Get employees by page number
  handlePageChange = async currentPage => {
    let props = this.props.match.params.page;

    if (!props) props = 1;
    props = currentPage;
    let { pagination } = this.state;
    pagination.page = currentPage;

    await fetch(`http://localhost:8080/api/employees/${currentPage}`)
      .then(response => response.json())
      .then(employees => {
        this.setState({ ...employees });
      });
  };

  //Get the first page of employees on mount
  componentDidMount = async () => {
    let props = this.props.match.params.page;
    if (!props) props = 1;

    await fetch(`http://localhost:8080/api/employees/`)
      .then(response => response.json())
      .then(employees => this.setState({ ...employees }));
  };

  render() {
    const { employees, pagination } = this.state;

    return (
      <div>
        <Link to="/employees/new" className="btn btn-primary btn-lg mb-2">
          New Employer
        </Link>
        <p>
          {!pagination.rowCount
            ? `There are no employees in the data base`
            : `${pagination.rowCount} employees in the data base`}
        </p>
        <Table employees={employees} handleDelite={this.handleDelite} />
        <Pagination {...this.state} onPageChange={this.handlePageChange} />
      </div>
    );
  }
}

export default Employees;
