import React from "react";
import Button from "../Button";
import { Link } from "react-router-dom";

const TableBody = ({ employees, handleDelite }) => {
  return (
    <tbody>
      {employees.map(employee => (
        <tr key={employee.id}>
          <th style={{ backgroundColor: employee.color }} />
          <td>
            <Link to={`/employees/view/${employee.id}`}>{employee.name}</Link>
          </td>
          <td>{employee.profession}</td>
          <td>{employee.city}</td>
          <td>{employee.branch}</td>
          <td>{employee.assigned ? "Yes" : "No"}</td>

          <td>
            <Link to={`/employees/view/${employee.id}`}>
              <i className="fas fa-edit" />
            </Link>
            <Button handleDelite={handleDelite} id={employee.id} />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
