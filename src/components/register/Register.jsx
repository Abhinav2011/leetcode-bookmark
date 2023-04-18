import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import google from "../../assets/google.svg";

const Register = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/homepage");
    }
  }, [user]);

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="title">Sign Up</h2>
        <div className="google-login">
          <button className="google-btn" onClick={signInWithGoogle}>
            <img alt="Google" src={google} />
            <p class="btn-text">Sign up with Google</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
