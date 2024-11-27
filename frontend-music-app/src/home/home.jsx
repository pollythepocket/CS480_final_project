import { Link } from "react-router-dom";

export default function Home() {

  return (
    <div>
      <h1>Music Together</h1>
      <Link to={"/login"}>
        <button>LOGIN</button>
      </Link>
    </div>
  );
}
