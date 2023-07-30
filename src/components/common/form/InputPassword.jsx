import { memo, useCallback } from "react";

const InputPassword = ({
  label,
  name,
  data,
  setData,
  placeholder,
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
        <input
          type="password"
          name={name}
          id={name}
          value={data}
          placeholder={placeholder}
          onChange={handleChange}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </td>
    </tr>
  );
};

export default memo(InputPassword);
