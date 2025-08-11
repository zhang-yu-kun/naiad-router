import { useNavigate } from "react-router";

const A2 = () => {
  const navigate = useNavigate();
  return (
    <div>
      A2
      <button onClick={() => navigate("/a2/b1")}>A2</button>
    </div>
  );
};

export default A2;
