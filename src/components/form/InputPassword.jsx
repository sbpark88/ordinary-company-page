import { debounce } from "../../modules/utils/Performance";

export default function InputPassword({
  label,
  name,
  data,
  setData,
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
        <input
          type="password"
          name={name}
          id={name}
          defaultValue={data}
          placeholder={placeholder}
          onChange={debouncedHandleChange}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </td>
    </tr>
  );
}
