import { useEffect } from "react";

export function InputText({
  label,
  data,
  setData,
  property,
  placeholder,
  errorMessage,
}) {
  const handleChange = (event) => {
    event.stopPropagation();
    const { value } = event.target;
    setData(value);
  };
  useEffect(() => {
    console.log(property, data);
  }, [data]);

  return (
    <tr>
      <th>
        <label htmlFor={property}>{label}</label>
      </th>
      <td>
        <input
          type="text"
          name={property}
          id={property}
          value={data}
          placeholder={placeholder}
          onChange={handleChange}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </td>
    </tr>
  );
}
