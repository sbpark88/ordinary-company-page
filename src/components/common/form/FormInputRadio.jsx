import { memo, useCallback } from "react";

const FormInputRadio = ({
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
          <Radio
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

function Radio({ name, data, property, setData }) {
  const handleChange = useCallback((event) => {
    event.stopPropagation();
    const { value } = event.target;
    setData(value);
  });

  return (
    <>
      <label htmlFor={property}>{property}</label>
      <input
        type="radio"
        name={name}
        id={property}
        defaultValue={property}
        checked={data === property}
        onChange={handleChange}
      />
    </>
  );
}

export default memo(FormInputRadio);
