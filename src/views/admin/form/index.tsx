import { useState } from "react";

const Form: React.FC = () => {
  const [value, setValue] = useState("");
  return (
    <>
      <div>
        <div>{value}</div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </>
  );
};

export default Form;
