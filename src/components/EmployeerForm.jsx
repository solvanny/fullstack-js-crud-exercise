import React from "react";
import Form from "./common/Form";
import Joi from "joi";

class EmployeerForm extends Form {
  state = {
    data: {
      name: "",
      code: "",
      profession: "",
      color: "",
      city: "",
      branch: "",
      assigned: null
    },
    codes: ["F100", "F101", "F102", "F103", "F104", "F105", "F106"],
    professions: ["Drywall Installer", "Runner"],
    colors: ["#FF6600", "yellow", "green", "#333333", "red"],
    cityes: ["Toronto", "Brampton", "Bolton"],
    branchs: ["Abacus", "Pillsworth"],

    errors: {}
  };

  // data Joi validation schema
  schema = {
    id: Joi.number(),
    name: Joi.string()
      .min(3)
      .max(50)
      .required()
      .label("Name"),
    code: Joi.string()
      .required()
      .label("Code"),
    color: Joi.string()
      .required()
      .label("Color"),
    profession: Joi.string()
      .min(0)
      .max(50)
      .label("Profession"),
    city: Joi.string()
      .min(0)
      .max(50)
      .label("City"),
    branch: Joi.string()
      .min(0)
      .max(50)
      .label("Branch"),
    assigned: Joi.bool().label("Assigned")
  };

  //Get employeer by ID from data base
  componentDidMount = async () => {
    let employeeId = this.props.match.params.id;
    if (!employeeId) return;
    await fetch(`http://localhost:8080/api/employees/view/${employeeId}`)
      .then(response => response.json())
      .then(employees => this.getEmployeerById(employees));
  };

  getEmployeerById(employee) {
    if (!employee) return this.props.history.replace("/not-found");

    let data = {
      name: employee.name,
      code: employee.code,
      profession: employee.profession,
      color: employee.color,
      city: employee.city,
      branch: employee.branch,
      assigned: Boolean(employee.assigned)
    };

    this.setState({ data });
  }

  //Form submit
  async doSubmit() {
    let id = this.props.match.params.id;
    let {
      name,
      code,
      profession,
      color,
      city,
      branch,
      assigned
    } = this.state.data;

    let item = {
      name: name,
      code: code,
      profession: profession,
      color: color,
      city: city,
      branch: branch,
      assigned: Boolean(assigned)
    };

    //If ID, Update the exists employeer
    //Else, Save new the employeer
    if (id) {
      await fetch(`http://localhost:8080/api/employees/${id}`, {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ user: item })
      });
    } else {
      await fetch(`http://localhost:8080/api/employees/`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ user: item })
      });
    }

    this.props.history.push("/employees");
  }

  render() {
    let id = this.props.match.params.id;
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("name", "Name")}
        {this.renderSelect("code", "Code", this.state.codes)}
        {this.renderSelect("profession", "Profession", this.state.professions)}
        {this.renderSelect("color", "Color", this.state.colors)}
        {this.renderSelect("city", "City", this.state.cityes)}
        {this.renderSelect("branch", "Branch", this.state.branchs)}
        {this.renderRadio("assigned", "Assigned", this.state.assigned)}
        {this.renderButton("Update", "Save", id)}
      </form>
    );
  }
}

export default EmployeerForm;
