import { Button } from "antd";
import { useState } from "react";

const Home: React.FC = () => {
  const [title, setTitle] = useState("home");

  return (
    <>
      <div>{title}</div>
      <Button onClick={() => setTitle("首页")}>Set</Button>
    </>
  );
};

export default Home;
