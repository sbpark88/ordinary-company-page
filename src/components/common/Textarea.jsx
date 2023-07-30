import { memo } from "react";

const Textarea = ({
  label,
  name,
  data,
  setData,
  size = { cols: 30, rows: 3 },
  placeholder,
  sibling,
}) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <textarea
        name={name}
        id={name}
        value={data}
        cols={size.cols}
        rows={size.rows}
        placeholder={placeholder}
        onChange={setData}
        style={style}
      />
      {sibling}
    </div>
  );
};

export default memo(Textarea);

const style = {
  resize: "none",
};
