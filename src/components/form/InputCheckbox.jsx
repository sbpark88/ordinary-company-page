import React from "react";
export default function InputCheckbox({
  label,
  name,
  data,
  setData,
  properties,
  errorMessage,
}) {
  const handleChange = (event) => {
    event.stopPropagation();
    const { value, checked } = event.target;
    setData(
      checked ? [...new Set([...data, value])] : data.filter((v) => v !== value)
    );
  };

  return (
    <tr>
      <th>{label}</th>
      <td onChange={handleChange}>
        {properties?.map((property) => (
          <Checkbox
            key={property}
            name={name}
            data={data}
            property={property}
          />
        ))}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </td>
    </tr>
  );
}

function Checkbox({ name, data, property }) {
  return (
    <>
      <label htmlFor={property}>{property}</label>
      <input
        type="checkbox"
        name={name}
        id={property}
        defaultValue={property}
        defaultChecked={data.includes(property)}
      />
    </>
  );
}
