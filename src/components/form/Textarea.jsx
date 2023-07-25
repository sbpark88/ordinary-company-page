import { debounce } from "../../modules/utils/Performance";

export function Textarea({
  label,
  name,
  data,
  setData,
  size,
  placeholder,
  errorMessage,
}) {
  const handleChange = (event) => {
    event.stopPropagation();
    const { value } = event.target;
    setData(value);
  };

  const debouncedHandleChange = debounce(handleChange);

  return (
    <tr>
      <th>
        <label htmlFor={name}>{label}</label>
      </th>
      <td>
        <textarea
          name={name}
          id={name}
          defaultValue={data}
          cols={size.cols}
          rows={size.rows}
          placeholder={placeholder}
          onChange={debouncedHandleChange}
          style={style}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </td>
    </tr>
  );
}

const style = {
  resize: "none",
};
