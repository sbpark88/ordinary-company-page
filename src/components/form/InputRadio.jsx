import React from "react";

export default function InputRadio({
  label,
  name,
  data,
  setData,
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
        {properties?.map((property) => (
          <Radio key={property} name={name} data={data} property={property} />
        ))}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </td>
    </tr>
  );
}

function Radio({ name, data, property }) {
  return (
    <>
      <label htmlFor={property}>{property}</label>
      <input
        type="radio"
        name={name}
        id={property}
        defaultValue={property}
        defaultChecked={data === property}
      />
    </>
  );
}
