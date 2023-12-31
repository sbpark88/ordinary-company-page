import { memo, useCallback } from "react";

const FormInputCheckbox = ({
  label,
  name,
  data,
  setData,
  properties,
  errorMessage,
}) => {
  return (
    <tr>
      <th>{label}</th>
      <td>
        {properties?.map((property) => (
          <Checkbox
            key={property}
            name={name}
            data={data}
            property={property}
            setData={setData}
          />
        ))}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </td>
    </tr>
  );
};

function Checkbox({ name, data, property, setData }) {
  const handleChange = useCallback(
    (event) => {
      event.stopPropagation();
      const { value, checked } = event.target;
      setData(
        checked
          ? [...new Set([...data, value])]
          : data.filter((v) => v !== value)
      );
    },
    [data, setData]
  );

  return (
    <>
      <label htmlFor={property}>{property}</label>
      <input
        type="checkbox"
        name={name}
        id={property}
        defaultValue={property}
        checked={data.includes(property)}
        onChange={handleChange}
      />
    </>
  );
}

export default memo(FormInputCheckbox);
