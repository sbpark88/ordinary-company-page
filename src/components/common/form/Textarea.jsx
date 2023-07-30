import { memo, useCallback } from "react";

const Textarea = ({
  label,
  name,
  data,
  setData,
  size,
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
        <textarea
          name={name}
          id={name}
          value={data}
          cols={size.cols}
          rows={size.rows}
          placeholder={placeholder}
          onChange={handleChange}
          style={style}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </td>
    </tr>
  );
};
export default memo(Textarea);

const style = {
  resize: "none",
};
