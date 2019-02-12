import React from "react";


const Button = ({handleDelite, id}) => {
  return (
    <button className="btn btn-danger btn-sm ml-3" onClick={() => handleDelite(id)}>
      Delete
    </button>
  );
};

export default Button;
