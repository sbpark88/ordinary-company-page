import { useCallback, useState } from "react";

const useInputs = (initialData) => {
  const [data, setData] = useState(initialData);

  const onChange = useCallback((event) => {
    event.stopPropagation();
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const reset = useCallback(() => setData(initialData), [initialData]);

  return [data, onChange, reset];
};

export default useInputs;
