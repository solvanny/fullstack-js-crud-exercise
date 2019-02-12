import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = ({ employees, handleDelite }) => {
  return (
    <div className="table-responsive-md">
    <table className="table table-hover ">
      <TableHeader />
      <TableBody employees={employees} handleDelite={handleDelite} />
    </table>
    </div>
  );
};

export default Table;
