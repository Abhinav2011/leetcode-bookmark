import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Register = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/homepage");
    }
  }, [user]);

  return (
    <div>
      <div className="register-with-google">
        <button onClick={signInWithGoogle}>Register with Google</button>
      </div>
      <div className="old-user">
        Already have an account ?<Link to="/">Login</Link>
      </div>
    </div>
  );
};

export default Register;
