import { useLoaderData } from "react-router-dom";

const User: React.FC = () => {
  const { data } = useLoaderData();
  console.log(data, "dataaaaa");

  return (
    <>
      <div>User</div>
    </>
  );
};

export default User;
