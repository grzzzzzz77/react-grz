import { Button } from "antd";
import { useState } from "react";

const User: React.FC = () => {
  const [count, setCount] = useState(0);
  const bbb = 2;
  return (
    <>
      <div>{bbb}</div>
      <div>User</div>
      <div>{count}</div>
      <Button onClick={() => setCount(count + 1)}>+1</Button>
      <div r-if={count > 4}>我是</div>
    </>
  );
};

export default User;
