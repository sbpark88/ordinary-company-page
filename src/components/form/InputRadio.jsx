import React from "react";

export function InputRadio({
  label,
  data,
  setData,
  property,
  properties,
  errorMessage,
}) {
  const handleChange = (event) => {
    event.stopPropagation();
    const { value } = event.target;
    setData(value);
  };

  return (
    <tr>
      <th>{label}</th>
      <td onChange={handleChange}>
        {properties?.map((prop) => (
          <React.Fragment key={prop}>
            <label htmlFor={prop}>{prop}</label>
            <input
              type="radio"
              name={property}
              id={prop}
              defaultValue={prop}
              defaultChecked={data}
            />
          </React.Fragment>
        ))}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </td>
    </tr>
  );
}
