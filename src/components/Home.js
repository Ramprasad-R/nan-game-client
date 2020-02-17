import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Link to="/login">
        <input type="button" value="Login" />
      </Link>
      <Link to="/signup">
        <input type="button" value="SignUp" />
      </Link>
    </div>
  );
}

export default Home;
