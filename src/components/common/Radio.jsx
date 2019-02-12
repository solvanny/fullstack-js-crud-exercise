import React from "react";

const Radio = ({ name, label, data, error, ...rest }) => {
  return (
    <div className="form-group">
      <div className="custom-control custom-radio custom-control-inline">
        <input
          {...rest}
          checked={data === true}
          type="radio"
          id={name}
          name={name}
          className="custom-control-input"
          value={true}
        />
        <label className="custom-control-label" htmlFor={name}>
          {label}
        </label>
      </div>
      <div className="custom-control custom-radio custom-control-inline">
        <input
          {...rest}
          checked={data === false}
          type="radio"
          id="customRadioInline2"
          name={name}
          className="custom-control-input"
          value={false}
        />
        <label className="custom-control-label" htmlFor="customRadioInline2">
          {`Not ${label}`}
        </label>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Radio;
