import { CustomFormError } from "../../modules/common/Errors";
import { memo } from "react";

export const Input = ({
  label,
  type,
  name,
  data,
  setData,
  placeholder,
  sibling,
}) => {
  if (type !== "text" && type !== "password" && type !== "email")
    throw CustomFormError(
      "허용되는 type 은 'text', 'password', 'email' 입니다."
    );

  return (
    <div>
      {label && <label>{label}</label>}
      <input
        type={type}
        name={name}
        id={name}
        value={data}
        placeholder={placeholder}
        onChange={setData}
      />
      {sibling}
    </div>
  );
};

export default memo(Input);
