import { memo, useCallback } from "react";

const Select = ({
  label,
  name,
  data,
  setData,
  propertiesWithName,
  errorMessage,
}) => {
  const handleChange = useCallback((event) => {
    event.stopPropagation();
    const { value } = event.target;
    setData(value);
  });

  return (
    <tr>
      <th>
        <label htmlFor={name}>{label}</label>
      </th>
      <td>
        <select name={name} id={name} value={data} onChange={handleChange}>
          {propertiesWithName?.map(([property, propertyName]) => (
            <Option
              key={property}
              property={property}
              propertyName={propertyName}
            />
          ))}
        </select>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </td>
    </tr>
  );
};

function Option({ property, propertyName }) {
  return <option value={property}>{propertyName}</option>;
}

export default memo(Select);
