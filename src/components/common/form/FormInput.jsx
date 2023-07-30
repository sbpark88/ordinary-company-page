import { memo, useCallback } from "react";
import { CustomFormError } from "../../../modules/common/Errors";

const FormInput = ({
  type,
  label,
  name,
  data,
  setData,
  placeholder,
  errorMessage,
}) => {
  if (type !== "text" && type !== "password" && type !== "email")
    throw CustomFormError(
      "허용되는 type 은 'text', 'password', 'email' 입니다."
    );

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
          type={type}
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

export default memo(FormInput);
